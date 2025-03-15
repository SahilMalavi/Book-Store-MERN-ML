import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import { Link } from "react-router-dom";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const YourBook = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/book`);
                // console.log(res.data);
                setBooks(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getBooks();
    }, []);


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots:false,
                    infinite:true
                }
            }
        ]
    };

    // Filtering the books by id greater than 0 to avoid null or undefined items in the list.
    // var data = list.filter((i) => i.id > 0)

    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-24 px-4'>
                <div>
                    <h2 className='text-2xl md:text-3xl font-bold'>Explore</h2>
                </div>

                <div className="slider-container m-5">
                    <Slider {...settings} >
                        {/* Map over the filtered data and create a card for each book */}
                        {
                            books.map((item) => (
                                <Link key={item._id || item.id} to={`/books/${item._id}`}>
                                    <Cards item={item} key={item._id || item.id} />
                                </Link>
                            ))
                        }

                    </Slider>
                </div>
            </div>
        </>

    )
}

export default YourBook
