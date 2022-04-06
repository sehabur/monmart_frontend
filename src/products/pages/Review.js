import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';

import { orderActions } from '../../store';
import { bdtSign } from '../../constants/common';
import { calculateCartAmount } from '../../shared/utilities/helper';

const Review = ({ activeStep, handleBack, handleNext, steps, submitOrder }) => {
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const cartSummary = calculateCartAmount(order.orderItems);

  const customerAddress = `${order.shippingAddress.address1}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zip}, ${order.shippingAddress.country}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
    submitOrder(order);
  };

  useEffect(() => {
    dispatch(orderActions.setAmount(cartSummary));
  }, [cartSummary, dispatch]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <List disablePadding>
          {order.orderItems.map((product) => (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${bdtSign} ${product.quantity}`}
              />
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>
          ))}

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={`Subtotal (${order.orderItems.length} items)`}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {`${bdtSign} ${cartSummary.totalProductPrice}`}
            </Typography>
          </ListItem>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Shipping Fee" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {`${bdtSign} ${cartSummary.shippingCost}`}
            </Typography>
          </ListItem>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total Amount" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {`${bdtSign} ${cartSummary.totalAmount}`}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping
            </Typography>
            <Typography
              gutterBottom
            >{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}</Typography>
            <Typography gutterBottom>{customerAddress}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Payment details
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Name</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {order.paymentMethod.cardName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography gutterBottom>Card Number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {order.paymentMethod.cardNumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}

          <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Review;
