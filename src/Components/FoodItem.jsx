import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, itemname, price, description, image }) => {
  const navigate = useNavigate();
  const { isAuthenticated, addToCart } = useContext(StoreContext);

  
  const formattedPrice = Number(price) || 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/menu" } });
      return;
    }
    addToCart({ _id: id, itemname, price: formattedPrice, description, image });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        {image ? (
          <img
            src={image}
            alt={itemname}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{itemname}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            ₹{formattedPrice.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiShoppingCart />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
