import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { STORAGE_PRODUCTS_CART, BASE_PATH } from "../../utils/constants";
import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray
} from "../../utils/arrayFunctions";

import "./Cart.scss";

export default function Cart(props) {
  const { products, productsCart, getProductsFromCart } = props;
  const [cartOpened, setCartOpened] = useState(false);
  const [uniqueProductsCart, setUniqueProductsCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const widthCartContent = cartOpened ? 400 : 0;

  // Trae todos los productos que hay en el carrito
  useEffect(() => {
    const allProductsIds = removeArrayDuplicates(productsCart);
    setUniqueProductsCart(allProductsIds);
  }, [productsCart]);

  // Actualiza el precio total en el carrito
  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductsIds = removeArrayDuplicates(productsCart);
    allProductsIds.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productsCart);
      const productValue = {
        id: productId,
        quantity: quantity
      };
      productData.push(productValue);
    });

    if (!products.loading && products.result) {
      products.result.forEach((product) => {
        productData.forEach((item) => {
          if (product.id == item.id) {
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }

    setCartTotalPrice(totalPrice);
  }, [productsCart, products]);

  // Abrir carrito
  const openCart = () => {
    setCartOpened(true);
    document.body.style.overflowY = "hidden";
  };

  // Cerrar carrito
  const closeCart = () => {
    setCartOpened(false);
    document.body.style.overflowY = "auto";
  };

  // Vaciar carrito
  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductsFromCart();
  };

  // Incrementar cantidad de producto en carrito
  const increaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    arrayItemsCart.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
    getProductsFromCart();
  };

  // Disminuir cantidad de producto en carrito
  const decreaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CART, result);
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
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
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
    idProductCart,
    increaseQuantity,
    decreaseQuantity
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart == product.id) {
        const quantity = countDuplicatesItemArray(product.id, productsCart);
        return (
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        );
      }
    });
  }

  return null;
}

function RenderProduct(props) {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props;

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
            <button onClick={() => increaseQuantity(product.id)}>+</button>
            <button onClick={() => decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props) {
  const { cartTotalPrice } = props;

  return (
    <div className="cart-content__footer">
      <div>
        <p>Total aproximado: </p>
        <p>{cartTotalPrice.toFixed(2)} $</p>
      </div>
      <Button>Tramitar pedido</Button>
    </div>
  );
}
