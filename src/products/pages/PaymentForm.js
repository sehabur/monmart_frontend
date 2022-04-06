import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';

import { orderActions } from '../../store';

const PaymentForm = ({ activeStep, handleBack, handleNext, steps }) => {
  const order = useSelector((state) => state.order);

  const [inputs, setInputs] = useState(order.paymentMethod);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
    dispatch(orderActions.setPaymentMethod(inputs));
  };

  const handleInputChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.paymentMethod ? order.paymentMethod.cardName : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.paymentMethod ? order.paymentMethod.cardNumber : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.paymentMethod ? order.paymentMethod.expDate : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={order.paymentMethod ? order.paymentMethod.cvv : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Remember credit card details for next time"
            />
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
    </React.Fragment>
  );
};

export default PaymentForm;
