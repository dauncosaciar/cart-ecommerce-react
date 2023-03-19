import React from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../Product";
import Loading from "../Loading";

export default function Products(props) {
  const {
    products: { loading, result },
    addProductToCart
  } = props;

  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.map((product) => (
            <Product key={product.id} product={product} addProductToCart={addProductToCart} />
          ))
        )}
      </Row>
    </Container>
  );
}
