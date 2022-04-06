import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { backEndServer, bdtSign } from '../../constants/common';
import { cartActions, orderActions } from '../../store';
import { calculateCartAmount } from '../../shared/utilities/helper';
import OpenLoginDialog from '../../users/components/OpenLoginDialog';

const Cart = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const [isSelectAllFromCart, setIsSelectAllFromCart] = useState(false);

  const cart = useSelector((state) => state.cart);

  const auth = useSelector((state) => state.auth);

  const theme = useTheme();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const selectedCartItems = cart.data
    ? cart.data.filter((item) => item.isSelectedForOrder === true)
    : null;

  const cartSummary = calculateCartAmount(selectedCartItems);

  useEffect(() => {
    cart.data && localStorage.setItem('cartData', JSON.stringify(cart.data));
  }, [cart.data]);

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('cartData'));
    dispatch(cartActions.setCartItemfromStorage(storedCartData));
  }, [dispatch]);

  useEffect(() => {
    if (cart.data) {
      if (cart.data.length === selectedCartItems.length) {
        setIsSelectAllFromCart(true);
      } else {
        setIsSelectAllFromCart(false);
      }
    }
  }, [cart.data, selectedCartItems]);

  const handleProductQuantity = (product, type) => {
    if (!(type === 'dec' && product.quantity <= 1)) {
      if (type === 'inc') {
        dispatch(cartActions.increaseCartItem(product));
      } else if (type === 'dec') {
        dispatch(cartActions.decreaseCartItem(product));
      }
    }
  };

  const handleRemoveItemFromCart = (product) => {
    dispatch(cartActions.removeItemFromCart(product));
  };

  const handleSetProductsForOrder = () => {
    const products = cart.data
      ? cart.data
          .filter((item) => item.isSelectedForOrder === true)
          .map((product) => ({
            name: product.name,
            quantity: product.quantity,
            image: product.image,
            price: product.price,
            product: product._id,
          }))
      : null;
    dispatch(orderActions.setProducts(products));

    handleUserLogin();
  };

  const handleUserLogin = () => {
    if (auth.data && auth.data.isLoggedIn) {
      navigate('/checkout');
    } else {
      setOpenLoginDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenLoginDialog(false);
  };

  const handleCartItemSelection = (event, productId) => {
    dispatch(
      cartActions.unselectCartItemForOrder({
        productId,
        selectValue: event.target.checked,
      })
    );
  };

  const handleSelectAllFromCart = (event) => {
    dispatch(cartActions.selectAllCartItem(event.target.checked));
  };

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item md={6} sx={{ my: 4, p: 4, bgcolor: 'white' }}>
          <Typography
            variant="h5"
            style={{
              display: 'inline',
            }}
          >
            Shopping Cart
          </Typography>

          {cart.data && cart.data.length > 0 ? (
            <>
              <Link
                to="/"
                style={{
                  display: 'inline',
                  color: theme.palette.monmartOrange.main,
                  marginLeft: '2rem',
                }}
              >
                See other products
              </Link>
              <Box>
                <FormGroup sx={{ display: 'inline' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isSelectAllFromCart}
                        onChange={handleSelectAllFromCart}
                      />
                    }
                    label="Select all"
                  />
                </FormGroup>

                <Typography sx={{ display: 'inline', float: 'right' }}>
                  Amount
                </Typography>
              </Box>
            </>
          ) : (
            <Box>
              <Typography sx={{ textAlign: 'center' }}>
                Your cart is Empty
              </Typography>
              <Link
                to="/"
                style={{
                  color: theme.palette.monmartOrange.main,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ textAlign: 'center', marginTop: '1rem' }}>
                  See all products
                </Typography>
              </Link>
            </Box>
          )}

          {cart.data &&
            cart.data.map((product) => (
              <Box key={product._id}>
                <Divider />
                <Checkbox
                  checked={product.isSelectedForOrder}
                  onChange={(e) => handleCartItemSelection(e, product._id)}
                />
                <Grid container spacing={3} key={Math.random()} sx={{ my: 1 }}>
                  <Grid item>
                    <Box component={Link} to={`../product/${product._id}`}>
                      <img
                        src={`${backEndServer}/${product.image}`}
                        alt="product-iamge"
                        width="150px"
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`../product/${product._id}`}
                      sx={{
                        display: 'inline',
                        color: theme.palette.monmartBlue.main,
                        textDecoration: 'none',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Price: {bdtSign} {product.price}
                    </Typography>

                    <Stack direction="row" alignItems="center">
                      <Typography>Quantity: </Typography>
                      <IconButton
                        onClick={() => handleProductQuantity(product, 'dec')}
                      >
                        <RemoveCircleOutlineIcon
                          sx={{ color: theme.palette.monmartOrange.main }}
                        />
                      </IconButton>
                      <Typography>{product.quantity}</Typography>

                      <IconButton
                        onClick={() => handleProductQuantity(product, 'inc')}
                      >
                        <AddCircleOutlineIcon
                          sx={{ color: theme.palette.monmartOrange.main }}
                        />
                      </IconButton>
                      <Button onClick={() => handleRemoveItemFromCart(product)}>
                        Delete
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ ml: 'auto' }}>
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.monmartOrange.main }}
                    >
                      {bdtSign} {(product.price * product.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
        </Grid>

        {cart.data && cart.data.length > 0 && (
          <Grid item md={2.5} sx={{ my: 4, ml: 3 }}>
            <Box sx={{ p: 3, bgcolor: 'white' }}>
              <Typography variant="h6">Order Summary</Typography>
              <Divider sx={{ my: 2 }} />

              <Stack direction="row">
                <Typography variant="subtitle1">
                  {`Subtotal (${selectedCartItems.length} items)`}
                </Typography>

                <Typography variant="subtitle1" sx={{ ml: 'auto' }}>
                  {`${bdtSign} ${cartSummary.totalProductPrice}`}
                </Typography>
              </Stack>

              <Stack direction="row">
                <Typography variant="subtitle1">Shipping Fee</Typography>

                <Typography variant="subtitle1" sx={{ ml: 'auto' }}>
                  {`${bdtSign} ${cartSummary.shippingCost}`}
                </Typography>
              </Stack>
              <Divider sx={{ mt: 3, mb: 1 }} />
              <Stack
                direction="row"
                sx={{
                  color: theme.palette.monmartBlue.main,
                  fontWeight: 100,
                }}
              >
                <Typography variant="subtitle1">Total Amount</Typography>

                <Typography variant="subtitle1" sx={{ ml: 'auto' }}>
                  {`${bdtSign} ${cartSummary.totalAmount}`}
                </Typography>
              </Stack>
              <Button
                fullWidth
                variant="contained"
                color="monmartOrange"
                sx={{ mt: 3, borderRadius: 0 }}
                onClick={handleSetProductsForOrder}
              >
                Go to Checkout
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <OpenLoginDialog
        open={openLoginDialog}
        onClose={handleDialogClose}
        redirect="/checkout"
      />
    </Box>
  );
};

export default Cart;
