import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import axios from 'axios';
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BookList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/book`);
                // console.log(res.data);
                setBooks(res.data);
                setFilteredBooks(res.data); // Set filteredBooks initially to all books
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getBooks();
    }, [books]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === '') {
            setFilteredBooks(books); // Reset to all books when search is empty
        } else {
            const filtered = books.filter((book) =>
                book.title.toLowerCase().includes(query)
            );
            setFilteredBooks(filtered);
        }
    };

    return (
        <>
            <Navbar />

            <div className="max-w-screen-2xl container mx-auto md:px-15 px-4">
                {/* Search box */}
                <div className="mx-8 my-8 md:m-12 lg:mx-80 shadow-lg">
                    <label className="px-2 py-2  rounded-md flex items-center gap-2">
                        <input
                            type="text"
                            className="grow outline-none w-full p-2 text-sm sm:text-base md:text-md"
                            placeholder="Search bookname"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-7 w-7 opacity-90"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>

                {/* Book List */}
                {isLoading ? (
                    <div className="mt-16 text-center text-xl text-gray-500">
                        Loading...
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <div className="mt-16 md:ml-8 md:mr-8 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredBooks.map((item) => (
                            <Link key={item._id || item.id} to={`/books/${item._id}`}>
                                <Cards item={item} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="mt-16 text-center text-lg text-gray-500">
                        No books found!
                    </div>
                )}
            </div>
        </>
    );
}

export default BookList;