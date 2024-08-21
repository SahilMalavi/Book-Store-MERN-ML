import React from 'react'
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import list from '../../public/bookList.json'

function BookList() {
    return (
        <>
            <Navbar />
            <div className='max-w-screen-2xl container mx-auto md:px-15 px-4 '>

                {/* <h1 className='text-2xl font-semibold md-text-4xl'>Book List</h1> */}
                <div className='mt-16 md:ml-8 md:mr-8  mx-auto grid grid-cols-1 md:grid-cols-4'>
                    {
                        list.map((item) => (
                            <Cards key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        </>

    )
}

export default BookList
