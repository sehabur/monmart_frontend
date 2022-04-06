import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';

import { backEndServer, bdtSign } from '../../constants/common';

const Watchlist = () => {
  const products = useSelector((state) => state.products);

  const theme = useTheme();

  const favItemsList =
    products && products.filter((item) => item.isFavourite === true);

  console.log(favItemsList);

  return (
    <Box sx={{ mt: 5, mx: 'auto', bgcolor: 'white', maxWidth: '700px' }}>
      {favItemsList && favItemsList.length > 0 ? (
        <>
          {' '}
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              bgcolor: theme.palette.monmartBlue.main,
              pl: 4,
              py: 1,
            }}
          >
            Watchlist
          </Typography>
          <List sx={{ p: 0 }}>
            {favItemsList &&
              favItemsList.map((product) => (
                <>
                  <ListItem
                    disablePadding
                    component={Link}
                    to={`/product/${product._id}`}
                  >
                    <ListItemButton>
                      <Avatar
                        alt="product image"
                        src={`${backEndServer}/${product.image}`}
                        sx={{ width: 50, height: 50, ml: 3, mr: 5 }}
                        variant="rounded"
                      />
                      <ListItemText
                        primary={product.name}
                        secondary={`${bdtSign} ${product.price}`}
                        sx={{
                          '& .MuiListItemText-secondary': {
                            color: theme.palette.monmartOrange.main,
                          },
                          '& .MuiListItemText-primary': {
                            color: theme.palette.monmartBlue.main,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
          </List>
        </>
      ) : (
        <Typography align="center" sx={{ py: 2 }}>
          No item to show
        </Typography>
      )}
    </Box>
  );
};

export default Watchlist;
