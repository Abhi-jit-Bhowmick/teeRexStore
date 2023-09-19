import React, { useReducer } from "react";
import ProductPage from "./Pages/ProductPage";
import "./App.css";
import CheckoutPage from "./Pages/CheckoutPage";
import TopNav from "./Components/TOPNAV/TopNav";
import { CartContext } from "./Context/CartContext";
import { reducerFunc } from "./Context/Reducer";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  const [state, dispatch] = useReducer(reducerFunc, { cart: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
