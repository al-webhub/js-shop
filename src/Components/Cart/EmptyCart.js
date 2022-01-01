import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const EmptyCart = () => {
  return (
    <>
      <Typography variant="h5">
        Your cart is empty. Start adding some!
      </Typography>
      <Button
        component={Link}
        to="/"
        size="small"
        variant="outlined"
        color="primary"
      >
        Shop
      </Button>
    </>
  );
};

export default EmptyCart;
