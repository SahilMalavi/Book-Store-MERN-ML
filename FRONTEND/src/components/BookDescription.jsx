import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cards from "../components/Cards"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SENTIMENT_API = import.meta.env.VITE_API_ML_URL;;
function BookDescription() {
    const location = useLocation();
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [review, setReview] = useState("");
    const [sentiment, setSentiment] = useState(null);

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
        if (!book || !book.title) return; // Ensure book is not null before API call

        axios.post(`${API_BASE_URL}/recommend`, { title: book.title })
            .then(res => {
                setRecommendedBooks(res.data.recommended_books);
            })
            .catch(err => {
                setRecommendedBooks([]);
                console.error(err)
            });
    }, [book]);

    const analyzeSentiment = async () => {
        try {
            const response = await axios.post(`${SENTIMENT_API}/analyze`, { review });
            setSentiment(response.data.sentiment);
        } catch (error) {
            console.error("Error analyzing sentiment:", error);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);


    if (!book) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    var settings = {
        dots: true,
        infinite: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: false,
                    infinite: true,


                }
            }
        ]
    };
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
                    <h1 className='text-xl mt-10 font-bold '>You might also like </h1><br />

                    <div className="slider-container m-2">
                        <Slider {...settings} >
                            {/* Map over the filtered data and create a card for each book */}
                            {
                                recommendedBooks.map((item) => (
                                    <Link key={item._id || item.id} to={`/books/${item._id}`}>
                                        <Cards item={item} key={item._id || item.id} />
                                    </Link>
                                ))
                            }
                        </Slider>
                    </div>
                </div>

                {/* Sentiment analysis of book reviews */}
                {/* <div>
                    <h1 className='text-xl mt-5 font-bold '>Book Reviews (Sentiment Analysis)</h1><br />
                            
                </div> */}

                <div className="mt-5">
                    <h1 className='text-xl font-bold '>Book Reviews (Sentiment Analysis)</h1>
                    <textarea
                        className="border p-2 w-full mt-5"
                        placeholder="Write your review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <button
                        onClick={analyzeSentiment}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Analyze Sentiment
                    </button>

                    {/* Show Sentiment Result */}
                    {sentiment && (
                        <p className="mt-3 text-lg font-bold">
                            Sentiment: <span className="text-blue-600">{sentiment}</span>
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default BookDescription
