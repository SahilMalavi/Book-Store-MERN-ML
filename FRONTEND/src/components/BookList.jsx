import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import list from '../../public/bookList.json';

function BookList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(list);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = list.filter((book) =>
            book.title.toLowerCase().includes(query)
        );
        setFilteredBooks(filtered);
    };

    return (
        <>
            <Navbar />

            <div className="max-w-screen-2xl container mx-auto md:px-15 px-4">
                {/* Search box | hidden for mob */}
                <div className="mx-8 my-8 md:m-12 lg:mx-80 ">
                    <label className="px-2 py-2 border rounded-md flex items-center gap-2 ">
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
                            className="h-5 w-5 opacity-90"
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
                {filteredBooks.length > 0 ? (
                    <div className="mt-16 md:ml-8 md:mr-8 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
                        {filteredBooks.map((item) => (
                            <a href='/bookdescription'><Cards key={item.id} item={item} /></a>
                        ))}
                    </div>
                ) : (
                    <div className="mt-16 text-center text-lg text-gray-500">
                        No books found
                    </div>
                )}
            </div>
        </>
    );
}

export default BookList;
