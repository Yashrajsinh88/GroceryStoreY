import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import axios from "axios"

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false); // ✔ corrected name
  const [products, setProducts] = useState([]);     // ✔ added from (1)
  const [cartItems, setCartItems] = useState({});
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [searchQuery, setsearchQuery] = useState({});


  // Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth');
      if (data.success) {
        setIsSeller(true)
      } else {
        setIsSeller(false)
      }
    } catch (error) {
      setIsSeller(false)
    }
  }


  // Fetch User Auth Status , User Data and Cart Items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('api/user/is-auth');
      if (data.success) {
        setUser(data.user)
        setCartItems(data.user.cartItems)
      }
    } catch (error) {
      setUser(null)
    }
  }

  // Fetch All Products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list')
      if (data.success) {
        setProducts(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Add Product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // Update Cart Item Quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove Product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    toast.success("Removed from Cart");
    setCartItems(cartData);
  };

  // Get cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);
      if (cartItems[item] > 0 && itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser()
    fetchSeller()
    fetchProducts();
  }, []);

  // Update Database Cart Items
  useEffect(() => {
    const updateCart = async ()=>{
      try {
        const { data } = await axios.post('/api/cart/update', {cartItems})
        if (!data.success) {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    if(user){
      updateCart()
    }
      },[cartItems])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,      // ✔ fixed
    showUserLogin,
    setShowUserLogin,
    searchQuery,
    setsearchQuery,
    products,
    setProducts,      // ✔ added from (1)
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    setCartItems
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
