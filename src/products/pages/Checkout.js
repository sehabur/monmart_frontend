import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { cartActions, orderActions } from '../../store';
import { backEndServer } from '../../constants/common';
import Spinner from '../../shared/components/Spinner';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [orderResponse, setOrderResponse] = useState({});

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Check for login and redirect to signin page if not //
  useEffect(() => {
    if (!auth.data || (auth.data && auth.data.isLoggedIn === false)) {
      navigate('/signin');
    }
  }, [auth.data, navigate]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
          />
        );
      case 1:
        return (
          <PaymentForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
          />
        );
      case 2:
        return (
          <Review
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
            submitOrder={submitOrder}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  const submitOrder = async (order) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.data.token}`,
        },
      };
      const response = await axios.post(
        `${backEndServer}/api/orders`,
        order,
        config
      );
      setOrderResponse(response);
      dispatch(orderActions.reset());
      dispatch(cartActions.reset());
      localStorage.removeItem('cartData');
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Spinner open={isLoading} />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is{' '}
                  {orderResponse.data && orderResponse.data.createdOrder._id}.
                  We have emailed your order confirmation, and will send you an
                  update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;
