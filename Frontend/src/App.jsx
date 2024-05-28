import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Contact from "./Components/Products/products";
import Products from "./Components/Contactus/Contactus";
import Address from "./Components/Address/Address";
import Category from "./Components/Category/category";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import AdminHome from "./Components/Admin/AdminHome";
import AddProducts from "./Components/Admin/AddProducts/AddProducts";
import ProductTable from "./Components/Admin/ProductTable/ProductTable";
import UserTable from "./Components/Admin/UserTable";
import Userchart from "./Components/Admin/Charts/User/Userchart";
import DeliveryAddress from "./Components/Delevery/DeliveryAddress";
import InvoiceGenerator from "./Components/Delevery/InvoiceGenerator";
import OrderList from "./Components/OrderedDetails/OrderList";
import SingleOrder from "./Components/Admin/OrderDetails/SingleOrder";
import Layout from "./Components/Admin/Layout/Layout";
import OrderDetails from "./Components/Admin/OrderDetails/OrderDetails";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
            </>
          }
        />
        <Route path="/Contact/:productId" element={<Contact />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/Category/:categoryName" element={<Category />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/DeliveryAddress" element={<DeliveryAddress />} />
        <Route path="/InvoiceGenerator" element={<InvoiceGenerator />} />
        <Route path="/OrderList" element={<OrderList />} />

        {/* Apply Layout to specific admin-related routes */}
        <Route element={<Layout />}>
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="/Userchart" element={<Userchart />} />
          <Route path="/SingleOrder/:orderId" element={<SingleOrder />} />
          <Route path="/ProductTable" element={<ProductTable />} />
          <Route path="/UserTable" element={<UserTable />} />
          <Route path="/OrderDetails" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
