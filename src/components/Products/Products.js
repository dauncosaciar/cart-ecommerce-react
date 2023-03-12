import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading";

export default function Products(props) {
  const {
    products: { loading, result, error }
  } = props;

  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.map((product) => <p key={product.id}>{product.name}</p>)
        )}
      </Row>
    </Container>
  );
}
