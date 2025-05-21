import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, menuItems, removeFromCart, updateCartItemQuantity } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const orderData = {
      items: cart,
      subtotal: calculateTotal(),
      deliveryFee: 50,
      total: calculateTotal() + 50,
    };
    localStorage.setItem("pendingOrder", JSON.stringify(orderData));
    navigate("/order");
  };

  if (!menuItems) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <h1 className="mt-4 text-xl font-semibold text-gray-700">
            Loading your cart...
          </h1>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl text-blue-500 mb-4">
            <FiShoppingBag className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Time to treat yourself! Browse our delicious menu and add some items
            to your cart.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div key={item._id} className="border-b last:border-b-0">
                  <div className="p-6 flex items-center space-x-6">
                    {item.image && item.image.trim() !== "" && (
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-500">
                              ID: {item._id}
                            </p>
                            
                          </div>
                          <div className="mt-1">
                            <p className="text-lg text-blue-600 font-medium">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateCartItemQuantity(
                                item._id,
                                item.quantity - 1
                              )
                            }
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus size={18} />
                          </button>
                          <span className="text-lg font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(
                                item._id,
                                item.quantity + 1
                              )
                            }
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <FiPlus size={18} />
                          </button>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cart.length})</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Item Details:
                  </h3>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item._id} className="text-sm text-gray-600">
                        <span className="font-medium">ID: {item._id}</span>
                        {/* <span className="mx-2">•</span> */}
                        <br />
                        <span>Item Name:{item.itemname}</span>
                        <br />
                        {/* <span className="mx-2">•</span> */}
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹50.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{(calculateTotal() + 50).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-[1.02]"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
