
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const storedOrder = localStorage.getItem("pendingOrder");
        const orderId =
          location.state?.orderId ||
          (storedOrder ? JSON.parse(storedOrder).orderId : null);

        if (!orderId) {
          setError("No order data found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://my-project-932b.onrender.com/api/order/id/${orderId}`
        );

        if (response.data.success) {
          const order = response.data.order;
          setOrderData({
            orderId: order.orderId,
            orderDate: order.createdAt,
            userData: {
              firstName: order.firstName,
              lastName: order.lastName,
              email: order.email,
              phone: order.phone,
              address: order.address,
            },
            items: order.items,
            subtotal: order.subtotal,
            deliveryFee: order.deliveryFee,
            total: order.total,
          });
        } else {
          throw new Error("Failed to fetch order data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Error loading order data");
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <h1 className="mt-6 text-2xl font-semibold text-gray-700 animate-pulse">
            Loading your order details...
          </h1>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl max-w-md transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">
            {error || "Unable to load order details"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-10 hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <svg
                className="w-14 h-14 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for ordering from our Restaurant!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="space-y-8">
              <InfoCard title="Order Details" icon="📦">
                <InfoRow label="Order ID" value={orderData.orderId} />
                <InfoRow
                  label="Order Date"
                  value={new Date(orderData.orderDate).toLocaleString()}
                />
              </InfoCard>

              <InfoCard title="Contact Info" icon="📧">
                <InfoRow label="Phone" value={orderData.userData.phone} />
                <InfoRow label="Email" value={orderData.userData.email} />
              </InfoCard>
            </div>

            {/* Right Section */}
            <div className="space-y-8">
              <InfoCard title="Delivery Address" icon="🏠">
                <p className="font-medium text-gray-900">
                  {orderData.userData.firstName}{" "}
                  {orderData.userData.lastName}
                </p>
                <p className="text-gray-600">{orderData.userData.address}</p>
              </InfoCard>

              <InfoCard title="Order Summary" icon="💳">
                <InfoRow label="Subtotal" value={`₹${orderData.subtotal}`} />
                <InfoRow
                  label="Delivery Fee"
                  value={`₹${orderData.deliveryFee}`}
                />
                <div className="border-t pt-2 mt-2">
                  <InfoRow
                    label="Total"
                    value={`₹${orderData.total}`}
                    bold
                  />
                </div>
              </InfoCard>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ordered Items
            </h2>
            <ul className="space-y-4">
              {orderData.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-700 font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const InfoCard = ({ title, icon, children }) => (
  <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <span className="text-xl">{icon}</span> {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoRow = ({ label, value, bold }) => (
  <div className="flex justify-between">
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`${
        bold ? "font-bold text-gray-800" : "font-medium text-gray-700"
      }`}
    >
      {value || "N/A"}
    </p>
  </div>
);

export default OrderConfirmation;
