
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Components/Login";
import About from "./Components/About";
import Menu from "./Components/Menu";
import Contact from "./Components/Contact";
import Profile from "./pages/Profile";
import Navbar from "./Components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./Components/AdminLogin";
import Cart from "./Components/Cart";
import OrderConfirmation from "./Components/OrderConfirmation";
import Reservation from "./Components/Reservation";
import Order from "./Components/Order";

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    setCartCount(savedCart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    const updatedCart = existingItem
      ? cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} updateCart={updateCart} />}
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
