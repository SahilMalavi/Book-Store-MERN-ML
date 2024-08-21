import React from 'react';
import Home from '../src/home/Home';
import BookList from './components/BookList';
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          {/* <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />}   /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
        {/* <Toaster /> */}

        <div className='mt-12 justify-center flex'> @Sahil Malavi</div>
      </div>
     
    </>
  )
}

export default App;