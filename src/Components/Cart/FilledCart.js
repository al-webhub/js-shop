import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import useStyles from "./CartStyles";
import CartItem from "./CartItem/CartItem";

const FilledCart = ({ cart }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <CartItem product={product} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            variant="contained"
            color="secondary"
            type="button"
          >
            Clear cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            variant="contained"
            color="primary"
            type="button"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilledCart;