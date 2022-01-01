import React, { useState, useEffect } from "react";
import { Products, Navbar, Cart } from "./Components";
import { commerce } from "./Components/lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  };

  const addToCartHandler = async (product_id, quantity) => {
    const item = await commerce.cart.add(product_id, quantity);
    setCart(item.cart);
  };

  const updateCartQuantityHandler = async (product_id, quantity) => {
    const { cart } = await commerce.cart.update(product_id, { quantity });
    setCart(cart);
  };

  const removeFromCartHandler = async (product_id) => {
    const { cart } = await commerce.cart.remove(product_id);
    setCart(cart);
  };

  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const pages = {
    cart: {
      component: (
        <Cart
          updateCartQuantityHandler={updateCartQuantityHandler}
          removeFromCartHandler={removeFromCartHandler}
          emptyCartHandler={emptyCartHandler}
          cart={cart}
        />
      ),
      link: "/cart",
    },
    products: {
      component: (
        <Products onAddToCart={addToCartHandler} products={products} />
      ),
      link: "/",
    },
  };

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}></Navbar>
        <Routes>
          <Route
            exact
            path={pages.products.link}
            element={pages.products.component}
          ></Route>
          <Route
            exact
            path={pages.cart.link}
            element={pages.cart.component}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
