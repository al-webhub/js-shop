import React from "react";
import useStyles from "./CartItemStyles";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

const CartItem = ({ product }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={product.image.url}
        alt={product.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h5">
          {product.price.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.CardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small">
            -
          </Button>
          <Typography>{product.quantity}</Typography>
          <Button type="button" size="small">
            +
          </Button>
        </div>
        <Button variant="contained" type="button" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
