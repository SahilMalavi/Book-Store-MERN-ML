import React from 'react';
import Home from '../src/home/Home';
import BookList from './components/BookList';
import ContactUs from './components/ContactUs';
import BookDescription from './components/BookDescription';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/contact" element={<ContactUs />}/>
          <Route path="/bookdescription" element={<BookDescription />} />          

        </Routes>
      </div>

      <footer className='mt-12 justify-center flex'>
        @Sahil Malavi
      </footer>
    </div>
  );
}

export default App;
