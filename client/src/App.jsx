import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext"; 

// Client Pages
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";

// Seller Pages
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Login from "./components/Login";
import Loading from "./components/Loading";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin} = useAppContext();
  const { isSeller } = useAppContext()

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">

      {/* Hide Navbar for Seller Panel */}
      {!isSellerPath && <Navbar />}
      {showUserLogin ? < Login/> : null}
      <Toaster />

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Client Product Routes */}
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/add-address" element={<AddAddress />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* User Pages */}
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading/>} />

          {/* Seller Panel */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>

        </Routes>
      </div>

      {/* Hide Footer for Seller Panel */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
