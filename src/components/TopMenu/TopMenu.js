import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Cart from "../Cart";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

import "./TopMenu.scss";

export default function TopMenu(props) {
  const { products, productsCart, getProductsFromCart } = props;

  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        <BrandNav />
        <Cart
          products={products}
          productsCart={productsCart}
          getProductsFromCart={getProductsFromCart}
        />
      </Container>
    </Navbar>
  );
}

function BrandNav() {
  return (
    <Navbar.Brand>
      <Logo />
      <h2>La Casa de los Helados</h2>
    </Navbar.Brand>
  );
}
