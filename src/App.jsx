import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Contact from './Components/Products/products';
import Products from './Components/Contactus/Contactus';
import Address from './Components/Address/Address';
import Category from './Components/Category/category';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div>
            <Helmet>
              <title>Home Page Title</title>
              <meta name="description" content="This is a description of the home page." />
            </Helmet>
            <Navbar />
            <Hero />
          </div>
        } />
        <Route path='/Contact/:productId' element={<Contact/>} />
        <Route path='/Products' element={<Products/>} />
        <Route path='/Address' element={<Address/>} />
        <Route path='/Category/:categoryName' element={<Category/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Login' element={<Login/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;