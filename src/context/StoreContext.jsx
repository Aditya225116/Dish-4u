import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        console.log("Fetching menu items...");
        const response = await fetch("https://my-project-932b.onrender.com/api/items");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch menu items: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Received data:", data);

        
        const itemsArray = Array.isArray(data) ? data : [data];
        console.log("Processed items:", itemsArray);

        if (itemsArray.length === 0) {
          console.warn("No items found in the response");
        }

        setMenuItems(itemsArray);
        setError(null);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError(
          err.message || "Failed to load menu items. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    if (!isAuthenticated) {
      return false;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    clearCart();
  };

  const contextValue = {
    menuItems,
    loading,
    error,
    cart,
    isAuthenticated,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    login,
    logout,
    getTotalCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
