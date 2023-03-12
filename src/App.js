import React from "react";
import TopMenu from "./components/TopMenu";
import Products from "./components/Products";
import useFetch from "./hooks/useFetch";
import { URL_API_PRODUCTS } from "./utils/constants";

function App() {
  // const products = useFetch("http://localhost:3000/dbProducts.json", null);
  const products = useFetch(URL_API_PRODUCTS, null);

  return (
    <div>
      <TopMenu />
      <Products products={products} />
    </div>
  );
}

export default App;
