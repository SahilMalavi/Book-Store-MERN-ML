import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function navbar() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Retrieve theme from localStorage on initial load
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.body.setAttribute('data-theme', storedTheme);

        // Ensure the toggle matches the current theme
        const themeToggle = document.querySelector('.theme-controller');
        if (storedTheme === 'dark') {
            themeToggle.checked = true;
        } else {
            themeToggle.checked = false;
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

   
    const [sticky, setSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const navItems = (<>
       <li><Link to='/'>Home</Link></li>
        <li><Link to='/books'>Books</Link></li>
        <li><Link to='/contact'>Contact</Link></li>

    </>)
    // const loginBtn = (<>
    //     <a className="  bg-black text-white text-1xl px-4 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer text-center">Login</a>
    // </>)
    return (
        <>        <div className={`max-w-screen-2xl container mx-auto md:px-15 px-4 bg-base-100 border ${sticky ? "sticky top-0 z-50 shadow-md bg-base-100 duration-300 transition-all ease-in-out" : ""}`}>

            <div className="navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        {/* Mobile menu */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-3xl">YourBook</a>
                </div>
                {/* Desktop menu */}
                <div className="navbar-end space-x-4">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-2  ">
                            {navItems}
                        </ul>
                    </div>
                    
                    {/* change theme toggle */}
                    <div>
                        <label className="grid cursor-pointer place-items-center">
                            <input
                                type="checkbox"
                                value="synthwave"
                                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                                checked={theme === 'dark'}
                                onChange={toggleTheme}

                            />
                            {/* sun icon */}
                            <svg
                                className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                
                                // onClick={() => setTheme(theme === 'dark' ? 'light' :"")}

                            >
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                            {/* moon icon */}
                            <svg
                                className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"

                                // onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </label>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default navbar
