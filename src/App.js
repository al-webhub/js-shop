import React, { useState, useEffect } from "react";
import { Products, Navbar } from "./Components";
import { commerce } from "./Components/lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const { response } = await commerce.cart.retrieve();
    setCart(response);
  };

  const addToCartHandler = async (product_id, quantity) => {
    const item = await commerce.cart.add(product_id, quantity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Products onAddToCart={addToCartHandler} products={products}></Products>
    </div>
  );
};

export default App;
