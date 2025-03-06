import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BookDescription() {

    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    useEffect(() => {
        axios.get(`${API_BASE_URL}/book/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error("Error fetching book details:", error);
            });
    }, [id]); 

    useEffect(() => {
        if (book && book.title) { 

            axios.post(`${API_BASE_URL}/recommend`, { book_title: book.title })
                .then(res => {
                    setRecommendedBooks(res.data.recommended_books); 
                    console.log("Recommended Books:", res.data.recommended_books);
                })
                .catch(error => {
                    setRecommendedBooks([]); 
                    console.error("Error fetching recommended books:", error);
                });
        }
    }, [book]); 

    if (!book) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <>
            <Navbar />

            <div className='max-w-screen-2xl container mx-auto md:px-24 px-4 mx-5 my-5 '>
                <h1 className='text-xl font-bold '>Book Description</h1><br />

                <div className="flex flex-col md:flex-row items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-6 md:p-10 bg-white dark:bg-gray-800">
                    {/* Book Image Section */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Book Details Section */}
                    <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                                {book.title}
                            </h3>
                            <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300">
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Author:</span> {book.author}
                            </p>
                            <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300">
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Category:</span> {book.category}
                            </p>
                            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Description:</span> {book.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recommendation of books */}
                <div>
                    <h1 className='text-xl mt-5 font-bold '>Book Recommendations </h1><br />
                    <ul className='grid grid-cols-5'>
                        {recommendedBooks.map((recommendedBook, index) => (
                            // <Link key={index} to={`/books/${item._id}`}> for this first save data in dataset into mango
                            //     <Cards key={index} item={item} />
                            // </Link>
                            <li key={index} className=' mt-5'>
                                <h3>{index + 1}: {recommendedBook.title}</h3>
                                <p>-{recommendedBook.author}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sentiment analysis of book reviews */}
                <div>
                    <h1 className='text-xl mt-5 font-bold '>Book Reviews (Sentiment Analysis)</h1><br />

                </div>
            </div>
        </>
    )
}

export default BookDescription
