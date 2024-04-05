import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero/Hero';
import Contact from './Components/Contact/Contact';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div><Navbar /><Hero /></div>} />
        <Route path='/Contact' element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
