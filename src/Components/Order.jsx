
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";

const Order = () => {
  const { cart, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });

  
  const generateOrderId = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    const phoneLast4 = formData.phone ? formData.phone.slice(-4) : "0000";
    return `ORD${timestamp}${phoneLast4}${random}`;
  };

  
  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  
  useEffect(() => {
    if (isFormValid() && formData.phone.length >= 4) {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
    }
  }, [formData]);

  
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.price * item.quantity || 0),
      0
    );
  };

  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isFormValid()) {
      alert("Please fill in all delivery fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const orderId = generateOrderId();

      const orderData = {
        ...formData,
        orderId,
        items: cart.map((item) => ({
          itemId: item._id,
          itemName: item.itemname,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: calculateTotal(),
        deliveryFee: 50,
        total: calculateTotal() + 50,
      };

      const response = await axios.post("https://my-project-932b.onrender.com/api/order", orderData);

      if (response.data.success) {
        const paymentOrderData = {
          orderId,
          items: cart.map((item) => ({
            ...item,
            itemNumber: `ITEM${item._id.slice(-4)}`,
          })),
          subtotal: calculateTotal(),
          deliveryFee: 50,
          total: calculateTotal() + 50,
          userData: formData,
          orderDate: new Date().toISOString(),
          status: "pending",
          backendOrderId: response.data.order._id,
        };

        localStorage.setItem("pendingOrder", JSON.stringify(paymentOrderData));
        clearCart();
        navigate("/payment");
      } else {
        throw new Error(response.data.message || "Order creation failed");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert(`Order failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (cart.length === 0) navigate("/cart");
  }, [cart, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: Delivery Form */}
        <div className="bg-white shadow-xl rounded-3xl p-8 animate__animated animate__fadeInLeft">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🚚 Delivery Info</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Proceed to Payment"}
            </button>
          </form>
        </div>

        
        <div className="bg-white shadow-xl rounded-3xl p-8 sticky top-10 animate__animated animate__fadeInRight">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaShoppingCart /> Order Summary
          </h2>

          {isFormValid() && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg text-blue-800">
              <p className="text-sm font-semibold">Order ID:</p>
              <p className="text-lg font-bold">{orderId}</p>
            </div>
          )}

          <div className="space-y-3 text-gray-700">
            {cart.map((item) => (
              <div key={item._id} className="border-b pb-2">
                <p className="font-semibold">{item.itemname}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
                <p className="text-sm">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹50.00</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <span>Total</span>
              <span className="text-blue-700">₹{(calculateTotal() + 50).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
