import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { STORAGE_PRODUCTS_CART, BASE_PATH } from "../../utils/constants";
import { removeArrayDuplicates, countDuplicatesItemArray } from "../../utils/arrayFunctions";

import "./Cart.scss";

export default function Cart(props) {
  const { products, productsCart, getProductsFromCart } = props;
  const [cartOpened, setCartOpened] = useState(false);
  const [uniqueProductsCart, setUniqueProductsCart] = useState([]);
  const widthCartContent = cartOpened ? 400 : 0;

  useEffect(() => {
    const allProductsIds = removeArrayDuplicates(productsCart);
    setUniqueProductsCart(allProductsIds);
  }, [productsCart]);

  const openCart = () => {
    setCartOpened(true);
    document.body.style.overflowY = "hidden";
  };

  const closeCart = () => {
    setCartOpened(false);
    document.body.style.overflowY = "auto";
  };

  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductsFromCart();
  };

  return (
    <>
      <Button onClick={openCart} variant="link" className="cart">
        {productsCart.length > 0 ? <CartFull /> : <CartEmpty />}
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
        <div className="cart-content__products">
          {uniqueProductsCart.map((idProductCart, index) => (
            <CartContentProducts
              key={index}
              products={products}
              productsCart={productsCart}
              idProductCart={idProductCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function CartContentHeader(props) {
  const { closeCart, emptyCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart} />
        <h2>Carrito</h2>
      </div>
      <Button variant="link" onClick={emptyCart}>
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartContentProducts(props) {
  const {
    products: { loading, result },
    productsCart,
    idProductCart
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart == product.id) {
        const quantity = countDuplicatesItemArray(product.id, productsCart);
        return <RenderProduct key={index} product={product} quantity={quantity} />;
      }
    });
  }

  return null;
}

function RenderProduct(props) {
  const { product, quantity } = props;

  return (
    <div className="cart-content__product">
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
      <div className="cart-content__product-info">
        <div>
          <h3>{product.name.substr(0, 25)}...</h3>
          <p>{product.price.toFixed(2)} $ / ud.</p>
        </div>
        <div>
          <p>En carrito: {quantity} uds.</p>
          <div>
            <button>+</button>
            <button>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}
