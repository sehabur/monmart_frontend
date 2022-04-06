import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { backEndServer, bdtSign } from '../../constants/common';

const AddToCartModal = (props) => {
  const navigate = useNavigate();

  const productsData = useSelector((state) => state.productDetails);
  const product = productsData.data ? productsData.data.payload : null;

  const handleCartButtonClick = (productId) => {
    navigate(`../cart`);
  };

  return (
    <div>
      {product && (
        <Dialog open={props.open} onClose={props.onClose}>
          <DialogContent>
            <IconButton
              sx={{
                position: 'absolute',
                right: 10,
                top: 10,
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
              onClick={props.onClose}
            >
              <CloseIcon
                sx={{
                  border: '1px solid black',
                  borderRadius: 50,
                }}
              />
            </IconButton>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs>
                <img
                  src={`${backEndServer}/${product.image}`}
                  alt="product-iamge"
                  width="100%"
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle1" sx={{ color: 'green' }}>
                  Added to the cart
                </Typography>
                <Typography variant="body1">Quantity: {props.qty}</Typography>
                <Typography variant="body1">
                  Total Price: {bdtSign}{' '}
                  {(product.price * props.qty).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ mb: 2 }}>
            <Button
              color="monmartOrange"
              variant="outlined"
              sx={{ textTransform: 'none', px: 5, mx: 1, borderRadius: 0 }}
              onClick={handleCartButtonClick}
            >
              Go to Cart
            </Button>
            <Button
              color="monmartOrange"
              variant="contained"
              sx={{ textTransform: 'none', px: 5, mx: 1, borderRadius: 0 }}
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AddToCartModal;
