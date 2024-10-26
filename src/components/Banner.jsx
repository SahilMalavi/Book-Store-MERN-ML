import React from 'react'
import banner from '../../public/banner1.png';
import { useState, useEffect } from 'react';


function Banner() {
    const taglines = [
        ["Imagine", "Explore", "Inspire"],
        ["Read", "Grow", "Inspire"],
        ["Explore", "Discover", "Imagine"],
        ["Read", "Dream", "Achieve"],
        ["Learn", "Connect", "Thrive"],
        ["Inspire", "Create", "Transform"],
        ["Think", "Write", "Reflect"],
    ];

    const [index, setIndex] = useState(0);
    const [flip, setFlip] = useState('flip-in');

    useEffect(() => {
        const interval = setInterval(() => {
            setFlip('flip-out');
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % taglines.length);
                setFlip('flip-in');
            }, 2000); // Match this duration with your flip-out transition
        }, 4000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [taglines.length]);

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-24 px-4 flex flex-col md:flex-row">
            <div className="order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
                <div className='mb-6'>
                    <h1 className='text-2xl md:text-4xl font-bold'>
                        A World of Books Awaits You, Discover Your <span className='text-yellow-600'>Next Great Read!</span>
                    </h1>
                </div>
                <div className='flex space-x-10 md:text-2xl'>
                    <div className='flex justify-between'>
                        <button className={`bg-green-500 m-5 text-white p-2 rounded-md hover:bg-slate-800 ${flip}`}>
                            {taglines[index][0]}
                        </button>
                        <button className={`bg-pink-500 m-5 text-white p-2 rounded-md hover:bg-slate-800 ${flip}`}>
                            {taglines[index][1]}
                        </button>
                        <button className={`bg-blue-500 m-5 text-white p-2 rounded-md hover:bg-slate-800 ${flip}`}>
                            {taglines[index][2]}
                        </button>
                    </div>
                </div>
            </div>
            <div className='md:w-1/2 order-1'>
                <img src={banner} alt="books" className='w-94 h-94' />
            </div>
        </div>
    );
}


export default Banner