import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";

import "./Cart.scss";

export default function Cart() {
  const [cartOpened, setCartOpened] = useState(false);
  const widthCartContent = cartOpened ? 400 : 0;

  const openCart = () => {
    setCartOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpened(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <>
      <Button onClick={openCart} variant="link" className="cart">
        <CartEmpty />
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        Todos mis productos...
      </div>
    </>
  );
}
