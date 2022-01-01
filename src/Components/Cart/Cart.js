import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./CartStyles";
import EmptyCart from "./EmptyCart";
import FilledCart from "./FilledCart";
import CartLoading from "./CartLoading";

const Cart = ({ cart }) => {
  const classes = useStyles();

  let cartContent = <CartLoading />;
  if (cart.line_items) {
    if (!cart.line_items.length) {
      cartContent = <EmptyCart />;
    } else {
      cartContent = <FilledCart cart={cart} />;
    }
  }

  return (
    <Container>
      <div className={classes.toolbar}></div>
      <Typography gutterBottom className={classes.title} variant="h3">
        Shopping cart
      </Typography>
      {cartContent}
    </Container>
  );
};

export default Cart;
