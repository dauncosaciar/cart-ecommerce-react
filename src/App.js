import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import TopMenu from "./components/TopMenu";
import Products from "./components/Products";
import useFetch from "./hooks/useFetch";
import { URL_API_PRODUCTS, STORAGE_PRODUCTS_CART } from "./utils/constants";

function App() {
  // const products = useFetch("http://localhost:3000/dbProducts.json", null);
  const products = useFetch(URL_API_PRODUCTS, null);
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    getProductsFromCart();
  }, []);

  // Recuperar productos del carrito
  const getProductsFromCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);

    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  // Agregar productos al carrito
  const addProductToCart = (id, name) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
    getProductsFromCart();
    toast.success(`'${name}' añadido al carrito correctamente.`);
  };

  return (
    <div>
      <TopMenu
        products={products}
        productsCart={productsCart}
        getProductsFromCart={getProductsFromCart}
      />
      <Products products={products} addProductToCart={addProductToCart} />
      <ToastContainer
        toastStyle={{ fontFamily: "Roboto, sans-serif" }}
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}

export default App;
