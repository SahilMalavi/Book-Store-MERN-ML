import React from 'react'
import Navbar from '../components/Navbar'
import banner from '../../public/banner.png'
function BookDescription() {
  return (
      <>
          <Navbar />

          <div className='max-w-screen-2xl container mx-auto md:px-24 px-4 mx-5 my-10 '>
          <h1 className='text-xl font-bold '>Book Description</h1><br/>

              <div className=" md:px-10 px-4 flex flex-col md:flex-row border-2 border-gray-300 rounded-md">
                  <div className='md:w-1/2'>
                      <img src={banner} alt="books" className='w-84 h-84 ' />
                  </div>
                  <div className=" md:w-1/2 m-5">
                      <div className='m-5 space-y-1 md:space-y-4'>
                          <h3 className='text-1xl md:text-2xl font-bold'>
                              Title:</h3>
                          <h3 className='text-1xl md:text-2xl font-bold'>Author: Jane Doe</h3>
                          <h3 className='text-1xl md:text-2xl font-bold'>Category: Fiction</h3>
                          <h3 className='text-1xl md:text-2xl font-bold'>Description: </h3>
                      </div>
                      
                      
                  </div>
                  
              </div>
                {/* Sentiment analysis of book reviews */}
              <div>
                  <h1 className='text-xl font-bold '>Book Reviews (Sentiment Analysis)</h1><br />

              </div>
              {/* Recommendation of books */}
              <div>
                  <h1 className='text-xl font-bold '>Book Recommendations </h1><br />

              </div>
          </div>
      </>
  )
}

export default BookDescription
