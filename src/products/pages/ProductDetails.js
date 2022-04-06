import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

import { backEndServer, bdtSign } from '../../constants/common';
import { cartActions, orderActions, productDetailsActions } from '../../store';
import AddToCartModal from '../components/AddToCartModal';
import Spinner from '../../shared/components/Spinner';

const ProductDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({ isError: false, message: '' });

  const params = useParams();

  const theme = useTheme();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [productQuantity, setProductQuantity] = useState(1);

  const cart = useSelector((state) => state.cart);

  const productsData = useSelector((state) => state.productDetails);
  const product = productsData.data ? productsData.data.payload : null;

  const [open, setOpen] = React.useState(false);

  const isProductOutOfStock = product && product.countInStock < 1;

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cart.data && localStorage.setItem('cartData', JSON.stringify(cart.data));
  }, [cart.data]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuyNow = () => {
    const productToBuyNow = [
      {
        name: product.name,
        quantity: productQuantity,
        image: product.image,
        price: product.price,
        product: product._id,
      },
    ];
    dispatch(orderActions.setProducts(productToBuyNow));
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    const cartData = {
      ...product,
      quantity: productQuantity,
      isSelectedForOrder: true,
    };
    dispatch(cartActions.addCartItem(cartData));

    setOpen(true);
  };

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${backEndServer}/api/products/${params.id}`
      );
      dispatch(productDetailsActions.getProduct(response.data.product));
    } catch (error) {
      setError({
        isError: true,
        message: error.response.data.message,
      });
    }
    setIsLoading(false);
  };

  const handleProductQuantity = (type) => {
    if (type === 'inc') {
      setProductQuantity((count) => count + 1);
    } else if (type === 'dec') {
      setProductQuantity((count) => {
        return count === 1 ? count : count - 1;
      });
    }
  };

  return (
    <Box sx={{ mt: 5, mx: 10, bgcolor: 'white' }}>
      {error.isError && <Alert severity="error">{error.message}</Alert>}

      <Spinner open={isLoading} />
      <AddToCartModal open={open} qty={productQuantity} onClose={handleClose} />

      {product && (
        <Grid container>
          <Grid item md={3} sx={{ m: 3 }}>
            <img
              src={`${backEndServer}/${product.image}`}
              alt="product-iamge"
              width="100%"
            />
          </Grid>

          <Grid item md={5} sx={{ m: 3 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: theme.palette.monmartBlue.main }}
            >
              {product.name}
            </Typography>

            <Stack direction="row" sx={{ my: 1 }}>
              <Rating
                name="rating"
                value={product.rating}
                readOnly
                precision={0.5}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ display: 'inline', ml: 1 }}
              >
                {product.numReviews} {` Rating(s)`}
              </Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary">
              Brand: {product.brand}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{
                display: 'inline',
                color: theme.palette.monmartOrange.main,
              }}
            >
              {bdtSign} {product.price}
            </Typography>
            {product.price !== product.originalPrice && (
              <Typography
                gutterBottom
                component="div"
                sx={{
                  ml: 2,
                  fontSize: '1.3rem',
                  display: 'inline',
                  textDecoration: 'line-through',
                }}
              >
                {bdtSign} {product.originalPrice}
              </Typography>
            )}

            <Box sx={{ mt: 1.5, mb: 3 }}>
              {product.countInStock > 0 ? (
                <Typography variant="h6" sx={{ color: 'green' }}>
                  In Stock
                </Typography>
              ) : (
                <Typography variant="h6" sx={{ color: 'red' }}>
                  Out of Stock
                </Typography>
              )}
            </Box>

            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>

            <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
              <Typography>Quantity: </Typography>
              <IconButton onClick={() => handleProductQuantity('dec')}>
                <RemoveCircleOutlineIcon
                  sx={{ color: theme.palette.monmartOrange.main }}
                />
              </IconButton>
              <Typography>{productQuantity}</Typography>

              <IconButton onClick={() => handleProductQuantity('inc')}>
                <AddCircleOutlineIcon
                  sx={{ color: theme.palette.monmartOrange.main }}
                />
              </IconButton>
            </Stack>

            <Button
              color="monmartOrange"
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 0,
                px: 6,
                textTransform: 'none',
                mb: 2,
                mr: 3,
              }}
              disabled={isProductOutOfStock}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
            <Button
              color="monmartOrange"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 0,
                px: 7,
                textTransform: 'none',
                mb: 2.3,
              }}
              disabled={isProductOutOfStock}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </Grid>

          <Grid item md={2}>
            <List sx={{ bgcolor: grey[100], mt: 3 }}>
              <ListItem>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>

                <ListItemText>
                  <Typography sx={{ fontSize: '.9rem' }}>
                    Delivery charge: ৳ 40
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <PaidIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ fontSize: '.9rem' }}>
                    Cash on delivery available
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <AssignmentReturnIcon />
                </ListItemIcon>

                <ListItemText>
                  <Typography sx={{ fontSize: '.9rem' }}>
                    7 days return
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProductDetails;
