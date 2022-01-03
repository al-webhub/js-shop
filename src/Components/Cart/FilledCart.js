import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./CartStyles";
import CartItem from "./CartItem/CartItem";

const FilledCart = ({
  cart,
  emptyCartHandler,
  updateCartQuantityHandler,
  removeFromCartHandler,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <CartItem
              product={product}
              onUpdateCartQuantity={updateCartQuantityHandler}
              onRemoveFromCart={removeFromCartHandler}
            />
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
            onClick={emptyCartHandler}
          >
            Clear cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
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
