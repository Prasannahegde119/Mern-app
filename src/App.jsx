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
import Cart from './Components/Cart/Cart';
import { CartProvider } from './Components/Cart/CartContext';
import AdminHome from './Components/Admin/AdminHome';
import AddProducts from './Components/Admin/AddProducts/AddProducts';
import ProductTable from './Components/Admin/ProductTable/ProductTable';

const App = () => {
  return (
    <BrowserRouter>
        <CartProvider>


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
     <Route path='/Cart' element={<Cart/>} />
     <Route path='/AdminHome' element={<AdminHome/>} />
     <Route path='/AddProducts' element={<AddProducts/>} />
     <Route path='/ProductTable' element={<ProductTable/>} />




   </Routes>
        </CartProvider>

     
    </BrowserRouter>
  );
}

export default App;