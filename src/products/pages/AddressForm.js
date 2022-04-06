import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';

import { orderActions } from '../../store';

const AddressForm = ({ activeStep, handleBack, handleNext, steps }) => {
  const order = useSelector((state) => state.order);

  const [inputs, setInputs] = useState(order.shippingAddress);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
    dispatch(orderActions.setShippingAddress(inputs));
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
        Shipping address
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.firstName : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.lastName : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.address1 : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.address2 : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.city : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.state : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.zip : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={handleInputChange}
              defaultValue={
                order.shippingAddress ? order.shippingAddress.country : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
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

export default AddressForm;
