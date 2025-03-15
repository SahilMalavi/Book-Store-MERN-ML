import React from 'react';

function Cards({ item }) {
    // Trim description to a maximum of 100 characters
    const trimmedDescription = item.description.length > 80
        ? item.description.substring(0, 80) + '...'
        : item.description;

    return (

        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl container px-4">
            <div className="card bg-base-100 shadow-xl mt-4 mb-4 dark:border-white  card-compact m-2 hover:scale-105 duration-200">
                {/* <figure>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                    />
                </figure> */}
                <figure className="w-full h-56 flex justify-center items-center bg-gray-100">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-fit"
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title text-sm md:text-sm font-semibold">
                        {item.title}
                        <div className="badge badge-secondary truncate text-xs ">{item.author}</div>
                    </h2>
                    <p className="text-sm sm:text-base md:text-md text-gray-600 line-clamp-3">{trimmedDescription}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{item.category}</div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default Cards;
