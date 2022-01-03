import React from "react";
import { Typography, CircularProgress, Divider, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./CheckoutStyles";

const Confirmation = ({ order, error }) => {
  const classes = useStyles();
  if (Object.keys(error).length !== 0) {
    return (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to home
        </Button>
      </>
    );
  }

  if (!order.customer) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <br />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to home
      </Button>
    </>
  );
};

export default Confirmation;
