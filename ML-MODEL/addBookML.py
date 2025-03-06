import time
import pandas as pd
import google.generativeai as genai
from pymongo import MongoClient
import json
import re

# ✅ MongoDB Connection
MONGO_URI = "mongodb+srv://sahilmalavi96:LSkOQf7m70nbANdQ@cluster0.fti9e.mongodb.net"
client = MongoClient(MONGO_URI)
db = client["bookStore"]
collection = db["newbooks"]

# ✅ Load CSV File
csv_file = "Books.csv"
df = pd.read_csv(csv_file, usecols=["ISBN", "Book-Title", "Book-Author", "Year-Of-Publication", "Publisher", "Image-URL-L"], 
                 dtype=str).head(30)
df = df.drop_duplicates('Book-Title')
print(df.shape)

# ✅ Rename Columns
df.rename(columns={
    "ISBN": "isbn",
    "Book-Title": "title",
    "Book-Author": "author",
    "Year-Of-Publication": "year_of_publication",
    "Publisher": "publisher",
    "Image-URL-L": "image"
}, inplace=True)

# ✅ Gemini API Setup
genai.configure(api_key="AIzaSyDIZ-9r8PsTZptlKoRwrNFzS22RIXuzI8I")  # Use a valid API key
model = genai.GenerativeModel("gemini-1.0-pro")

def extract_json(text):
    """Extracts JSON object from Gemini response text."""
    match = re.search(r'\{.*\}', text, re.DOTALL)  # Finds a JSON block
    if match:
        try:
            return json.loads(match.group(0))  # Convert to dictionary
        except json.JSONDecodeError:
            return None  # JSON was invalid
    return None  # No valid JSON found

def get_book_info(title, author, year):
    prompt = f"""
    Generate a concise, engaging book description (15-25 words) and the 1 most relevant categories/genres, in JSON format for the following book information:

    Book Information:
    * Title: {title}
    * Author: {author}
    * Year of Publication: {year}

    Output JSON Format:
    {{
      "description": "[Your Concise Description]",
      "categories": "[Category 1]"
    }}
    """
    try:
        response = model.generate_content([prompt])
        book_data = extract_json(response.text.strip())

        if book_data and isinstance(book_data, dict):
            return book_data

    except Exception as e:
        print(f"❌ Error processing {title}: {e}")

    # ✅ Default return if error occurs
    return {"description": "No description available", "categories": "Unknown"}

# ✅ Processing and Uploading Books in Batches
batch_size = 15  # Number of books to process per minute
total_books = len(df)

for i in range(0, total_books, batch_size):
    batch = df.iloc[i:i+batch_size]  # Get the next batch of 15 books
    books_to_insert = []
    
    for _, row in batch.iterrows():
        title = row["title"]
        author = row["author"]
        year = row["year_of_publication"]
        publisher = row["publisher"]
        image = row["image"]
        isbn = row["isbn"]

        book_info = get_book_info(title, author, year)
        time.sleep(3)  
        # ✅ Ensure required keys exist
        description = book_info.get("description", "No description available")
        category = book_info.get("categories", "Unknown")

        book_entry = {
            "isbn": isbn,
            "title": title,
            "author": author,
            "year_of_publication": year,
            "publisher": publisher,
            "image": image,
            "description": description,
            "category": category
        }

        books_to_insert.append(book_entry)

    # ✅ Insert into MongoDB
    if books_to_insert:
        collection.insert_many(books_to_insert)
        print(f"✅ Inserted {len(books_to_insert)} books into MongoDB.")
    else:
        print("❌ No books to insert.")
    
    if i + batch_size < total_books:  # Avoid sleeping after the last batch
        print(f"Waiting for 1 minute before processing the next batch...")
        time.sleep(60)  # Wait for 1 minute (60 seconds)

# import time
# import pandas as pd
# import google.generativeai as genai
# from pymongo import MongoClient
# import json

# # ✅ MongoDB Connection
# MONGO_URI = "mongodb+srv://sahilmalavi96:LSkOQf7m70nbANdQ@cluster0.fti9e.mongodb.net"
# client = MongoClient(MONGO_URI)
# db = client["bookStore"]
# collection = db["newbooks"]

# # ✅ Load CSV File
# csv_file = "Books.csv"
# df = pd.read_csv(csv_file, usecols=["ISBN", "Book-Title", "Book-Author", "Year-Of-Publication", "Publisher", "Image-URL-L"], 
#                  dtype=str).head(30)
# df = df.drop_duplicates('Book-Title')

# # ✅ Rename Columns
# df.rename(columns={
#     "ISBN": "isbn",
#     "Book-Title": "title",
#     "Book-Author": "author",
#     "Year-Of-Publication": "year_of_publication",
#     "Publisher": "publisher",
#     "Image-URL-L": "image"
# }, inplace=True)

# # ✅ Gemini API Setup
# genai.configure(api_key="AIzaSyDIZ-9r8PsTZptlKoRwrNFzS22RIXuzI8I")  
# model = genai.GenerativeModel("gemini-1.0-pro")

# def extract_json(text):
#     """Extracts and validates JSON from Gemini response."""
#     try:
#         return json.loads(text)  # Directly parse JSON
#     except json.JSONDecodeError as e:
#         print(f"❌ JSON Decode Error: {e}")
#         return None  # Return None if invalid JSON

# def get_book_info(title, author, year):
#     """Gets book description and category from Gemini API."""
#     prompt = f"""
#     Generate a JSON response with a concise (15-25 words) engaging book description and 1 most relevant category/genre.

#     Book Information:
#     * Title: {title}
#     * Author: {author}
#     * Year of Publication: {year}

#     Output JSON Format:
#     {{
#       "description": "[Your Concise Description]",
#       "categories": "[Category]"
#     }}
#     """

#     try:
#         response = model.generate_content([prompt])
#         book_data = extract_json(response.text.strip())

#         if book_data and isinstance(book_data, dict):
#             return book_data

#     except Exception as e:
#         print(f"❌ Error processing {title}: {e}")

#     return {"description": "No description available", "categories": "Unknown"}

# # ✅ Processing Books in Batches
# batch_size = 15  
# total_books = len(df)

# for i in range(0, total_books, batch_size):
#     batch = df.iloc[i:i+batch_size]  
#     books_to_insert = []
    
#     for _, row in batch.iterrows():
#         title = row["title"]
#         author = row["author"]
#         year = row["year_of_publication"]
#         publisher = row["publisher"]
#         image = row["image"]
#         isbn = row["isbn"]

#         book_info = get_book_info(title, author, year)
#         time.sleep(3)  # Wait 3 seconds per request to avoid rate limits

#         book_entry = {
#             "isbn": isbn,
#             "title": title,
#             "author": author,
#             "year_of_publication": year,
#             "publisher": publisher,
#             "image": image,
#             "description": book_info.get("description", "No description available"),
#             "category": book_info.get("categories", "Unknown")
#         }

#         books_to_insert.append(book_entry)

#     # ✅ Insert into MongoDB
#     if books_to_insert:
#         collection.insert_many(books_to_insert)
#         print(f"✅ Inserted {len(books_to_insert)} books into MongoDB.")
#     else:
#         print("❌ No books to insert.")
    
#     if i + batch_size < total_books:  
#         print("Waiting for 1 minute before processing the next batch...")
#         time.sleep(60)  # Wait for 1 minute
