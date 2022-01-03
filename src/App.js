import React, { useState, useEffect } from "react";
import { Products, Navbar, Cart, Checkout } from "./Components";
import { commerce } from "./Components/lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const captureCheckoutHandler = async (checkoutTokenId, newOrder) => {
    try {
      setOrder({});
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
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
      component: <Products onAddToCart={addToCartHandler} products={products} />,
      link: "/",
    },
    checkout: {
      component: <Checkout order={order} onCaptureCheckout={captureCheckoutHandler} error={errorMessage} cart={cart} />,
      link: "/checkout",
    },
  };

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}></Navbar>
        <Routes>
          <Route exact path={pages.products.link} element={pages.products.component}></Route>
          <Route exact path={pages.cart.link} element={pages.cart.component}></Route>
          <Route exact path={pages.checkout.link} element={pages.checkout.component}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
