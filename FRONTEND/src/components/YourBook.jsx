import React from 'react'
import list from '../../public/bookList.json'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';


function YourBook() {
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
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Filtering the books by id greater than 0 to avoid null or undefined items in the list.
    var data = list.filter((i) => i.id > 0)

    return (
      <>
        <div className='max-w-screen-2xl container mx-auto md:px-24 px-4 m-5 mb-20'>
              <div>
                  <h2 className='text-2xl md:text-3xl font-bold'>Book List</h2>
              </div>
          
                <div className="slider-container m-5">
                <Slider {...settings} >
                        {/* Map over the filtered data and create a card for each book */}
                        { 
                          data.map((item) => (
                              <Cards item={item} key={item.id} />
                          ))
                      }

                </Slider>
              </div>
          </div>
      </>
      
  )
}

export default YourBook
