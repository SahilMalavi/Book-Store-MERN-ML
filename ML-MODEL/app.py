from flask import Flask, request, jsonify
import pandas as pd
import pickle
import numpy as np

# Load the models and data
popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl', 'rb'))

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Book Recommendation API" ,"api":popular_df.to_dict(orient="list")})

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        user_input = data.get('book_title')

        if not user_input:
            return jsonify({"error": "Book title is required"}), 400

        if user_input not in pt.index:
            return jsonify({"error": "Book not found"}), 404

        index = np.where(pt.index == user_input)[0][0]
        similar_items = sorted(
            list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True
        )[1:11]

        recommendations = []
        for i in similar_items:
            temp_df = books[books['Book-Title'] == pt.index[i[0]]].drop_duplicates('Book-Title')

            recommendations.append({
                "title": temp_df['Book-Title'].values[0],
                "author": temp_df['Book-Author'].values[0],
                "image": temp_df['Image-URL-M'].values[0]
            })

        return jsonify({"recommended_books": recommendations})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
