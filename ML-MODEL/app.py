from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import os
from dotenv import load_dotenv
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

analyzer = SentimentIntensityAnalyzer()
# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["bookStore"]
collection = db["newbooks"]



def fetch_books_from_db():
    """Fetch books from MongoDB and return as a DataFrame."""
    books_data = list(collection.find({}, {"_id": 1, "isbn": 1, "title": 1, "author": 1, 
                                          "year_of_publication": 1, "publisher": 1, 
                                          "image": 1, "description": 1, "category": 1}))
    
    for book in books_data:
        book['_id'] = str(book['_id'])
    
    return pd.DataFrame(books_data)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Book Recommendation API using MongoDB"})

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        user_input = data.get('title')
        
        if not user_input:
            return jsonify({"error": "Book title is required"}), 400
        
        # Fetch books from MongoDB dynamically
        books = fetch_books_from_db()
        
        if user_input not in books['title'].values:
            return jsonify({"error": "Book not found"}), 404

        # Fill missing values with empty strings to avoid errors
        books.fillna({'description': '', 'category': '', 'author': ''}, inplace=True)
        
        # Create a combined feature column for text similarity
        books['combined_features'] = books['description'] + " " + books['category'] + " " + books['author']

        # Compute TF-IDF matrix
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf_vectorizer.fit_transform(books['description'] + " " + books['category'] + " " + books['author'])
        
        # Compute Cosine Similarity
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        
        # Find the index of the book that matches the title
        idx = books[books['title'] == user_input].index[0]
        
        # Get similarity scores and sort them
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:11]  # Top 10 similar books
        
        # Get recommended book indices
        book_indices = [i[0] for i in sim_scores]
        
        # Extract book details including _id
        recommendations = books.iloc[book_indices][['_id', 'isbn', 'title', 'author',
                                                     'year_of_publication', 'publisher',
                                                     'image', 'category', 'description']]
        
        return jsonify({"recommended_books": recommendations.to_dict(orient="records")})
    
    except Exception as e:
        return jsonify({"error": str(e)})



@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    review = data.get('review', '')

    if not review:
        return jsonify({"error": "Review text is required"}), 400

    sentiment_score = analyzer.polarity_scores(review)

    if sentiment_score['compound'] >= 0.05:
        sentiment = "positive"
    elif sentiment_score['compound'] <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return jsonify({"sentiment": sentiment, "score": sentiment_score['compound']})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
