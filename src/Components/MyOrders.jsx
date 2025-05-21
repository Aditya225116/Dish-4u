import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedOrders = localStorage.getItem("pendingOrder");
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      
      const ordersArray = Array.isArray(parsedOrders)
        ? parsedOrders
        : [parsedOrders];
      setOrders(ordersArray);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h2>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderId}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Payment: {order.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.itemname}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-sm text-gray-500">
                            No Image
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.itemname}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Delivery Fee</span>
                    <span>₹{order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>

                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Delivery Information
                  </h4>
                  <p className="text-sm text-gray-600">
                    {order.userData.firstName} {order.userData.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.userData.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {order.userData.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
