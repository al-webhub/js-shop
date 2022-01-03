import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem divider={true} key={product.id}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total: " />
          <Typography variant="subtitle1">{checkoutToken.live.subtotal.formatted_with_symbol}</Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
