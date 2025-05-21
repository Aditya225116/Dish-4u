import React, { useState, useContext } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { menuItems, loading, error, isAuthenticated, addToCart } =
    useContext(StoreContext);

  React.useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      setFilteredItems(menuItems);
      const uniqueCategories = [
        "All",
        ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    }
  }, [menuItems]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/menu" } });
      return;
    }
    addToCart(item);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const searchTerm = query.toLowerCase();

    const filtered = menuItems.filter((item) => {
      const matchesName = item.itemname.toLowerCase().includes(searchTerm);
      const matchesCategory = item.category?.toLowerCase().includes(searchTerm);
      const matchesDescription = item.description
        ?.toLowerCase()
        .includes(searchTerm);

      return matchesName || matchesCategory || matchesDescription;
    });

    setFilteredItems(filtered);
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    setSearchQuery(""); // Clear search when changing category
    const filtered = menuItems.filter((item) => {
      return category === "All" || item.category === category;
    });
    setFilteredItems(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <h1 className="mt-4 text-xl font-semibold text-gray-700">
            Loading menu items...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-3">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Menu
        </h1>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
          <p className="text-yellow-700">
            No menu items available at the moment.
          </p>
          <p className="text-sm mt-2 text-yellow-600">
            Please check back later or contact support if this persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in tracking-tight">
              Discover Our Menu
            </h1>
            {!isAuthenticated && (
              <p className="text-indigo-100 text-lg mt-4 font-light">
                Please login to add items to your cart
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm ${
                activeCategory === cat
                  ? "bg-white text-indigo-600 shadow-xl ring-2 ring-indigo-500/20"
                  : "bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No items found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any menu items matching your search.
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => filterByCategory("All")}
                className="px-6 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
              >
                View all items
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-110 hover:z-10 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-2/3">
                  <img
                    src={item.image}
                    alt={item.itemname}
                    className="w-[300px] h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-500 group-hover:translate-y-2">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.itemname}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-1 group-hover:line-clamp-2 transition-all duration-500">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="p-4 h-1/3 flex flex-col justify-between transform transition-transform duration-500 group-hover:translate-y-2">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹
                      {parseFloat(item.price).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <p className="text-sm text-indigo-600 mt-1">
                      {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={loading}
                    className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 transition-all duration-500 hover:scale-110 self-end ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiShoppingCart className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
