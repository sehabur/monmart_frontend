import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  InputBase,
  Typography,
  Button,
  Popover,
  Divider,
  Link,
  useMediaQuery,
  Stack,
  Badge,
  useTheme,
  styled,
  alpha,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Avatar,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import brandLogo from '../../assests/monmart-brand-logo.png';
import brandLogoOnly from '../../assests/monmart-logo-only.png';
import { bdtSign } from '../../constants/common';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, cartActions } from '../../store';
import ToastMessage from './ToastMessage';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: `${theme.spacing(0.2)} solid ${theme.palette.monmartOrange.main}`,
  borderRadius: theme.spacing(1),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.monmartPink.main, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '550px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    color: theme.palette.monmartBlue.main,
    padding: theme.spacing(0.7, 1, 0.7, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledAppbarButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.monmartBlue.main,
  fontSize: '0.9rem',
  '& .MuiButton-startIcon': { margin: '0.3rem' },
  '& .MuiButton-endIcon': { margin: 0 },
  marginRight: '1rem',
  '&:hover': {
    color: theme.palette.monmartOrange.main,
    backgroundColor: 'transparent',
  },
}));

const accountMenuItems = [
  {
    name: 'Account',
    link: '#',
  },
  {
    name: 'Orders',
    link: '/myorders',
  },
  {
    name: 'Recommendation',
    link: '#',
  },
  {
    name: 'Watchlist',
    link: '/watchlist',
  },
];

const Header = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [appbarHeight, setAppbarHeight] = useState(null);

  const [favItemsAnchorEl, setFavItemsAnchorEl] = useState(null);

  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const matchedMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const matchedSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const cart = useSelector((state) => state.cart);

  const auth = useSelector((state) => state.auth);

  const products = useSelector((state) => state.products);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const cartSize = cart.data && cart.data.length > 0 ? cart.data.length : 0;

  const favItemMenuOpen = Boolean(favItemsAnchorEl);

  const favItemsList =
    products && products.filter((item) => item.isFavourite === true);

  const slicedFavItemsList = favItemsList && favItemsList.slice(0, 4);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    dispatch(authActions.login(storedUserInfo));
  }, [dispatch]);

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('cartData'));
    dispatch(cartActions.setCartItemfromStorage(storedCartData));
  }, [dispatch]);

  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      setAppbarHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const handleFavItemMenuClick = (event) => {
    setFavItemsAnchorEl(event.currentTarget);
  };

  const handleFavItemMenuClose = () => {
    setFavItemsAnchorEl(null);
  };

  const handleSignInClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignInMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignInMenuItemClick = (nagigateTo) => {
    setAnchorEl(null);
    setOpenDrawer(false);
    navigate(nagigateTo);
  };

  const handleCartButtonClick = () => {
    navigate(`cart`);
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('userInfo');
    setLogoutSuccess(true);
  };

  const handleLogoutToastColse = () => {
    setLogoutSuccess(false);
  };

  const handleToggleDrawer = (state) => {
    setOpenDrawer(state);
  };

  const handleDrawerItemClick = (nagigateTo) => {
    setOpenDrawer(false);
    navigate(nagigateTo);
  };

  const signInBox = (
    <>
      <Box sx={{ textAlign: 'center', py: 2, px: 4 }}>
        {auth.data && auth.data.isLoggedIn ? (
          <>
            <Typography variant="body2">
              Hello, {auth.data.email.slice(0, auth.data.email.indexOf('@'))}
            </Typography>
            <Button
              variant="contained"
              color="monmartPink"
              fulWidth
              sx={{
                px: 6,
                my: 1,
                textTransform: 'none',
                fontSize: '1rem',
              }}
              onClick={() => {
                handleSignOut();
                setAnchorEl(null);
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="monmartPink"
              fullWidth
              sx={{
                px: 6,
                mt: 1,
                mb: 2,
                textTransform: 'none',
                fontSize: '1rem',
              }}
              onClick={() => {
                handleSignInMenuItemClick('/signin');
              }}
            >
              Sign In
            </Button>
            <Typography>
              New Customer?
              <Link
                underline="hover"
                sx={{
                  m: 1,
                  '&:hover': {
                    color: `${theme.palette.monmartOrange.main}`,
                    cursor: 'pointer',
                  },
                }}
                onClick={() => {
                  handleSignInMenuItemClick('/signup');
                }}
              >
                Start here
              </Link>
            </Typography>
          </>
        )}
      </Box>
      <Divider orientation="horizontal" variant="middle" />

      <Box sx={{ pt: 1.5, pb: 3, px: 3 }}>
        <Typography variant="h6">Your Account</Typography>

        {accountMenuItems.map((item) => (
          <Link
            underline="hover"
            sx={{
              display: 'block',
              color: `${theme.palette.grey[700]}`,
              py: 0.5,
              '&:hover': {
                color: `monmartOrange.main`,
                cursor: 'pointer',
              },
              fontSize: '.9rem',
            }}
            onClick={() => {
              handleSignInMenuItemClick(item.link);
            }}
          >
            {item.name}
          </Link>
        ))}
      </Box>
    </>
  );

  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => handleToggleDrawer(false)}
      >
        <Box sx={{ mx: 'auto', mt: 1 }}>
          <img src={brandLogo} alt="logo" height="40" />
        </Box>

        <List>
          <Divider />
          <ListItem button onClick={() => handleDrawerItemClick('/watchlist')}>
            <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Favorite" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleDrawerItemClick('/cart')}>
            <ListItemIcon>
              <ShoppingCartCheckoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          <Divider />
          {signInBox}
        </List>
      </Drawer>

      <ToastMessage
        open={logoutSuccess}
        severity="success"
        message="Logout Successful!"
        onClose={handleLogoutToastColse}
      />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            bgcolor: theme.palette.common.white,
            py: 1.2,
          }}
          ref={measuredRef}
        >
          <Toolbar>
            {matchedSmDown && (
              <IconButton
                size="large"
                edge="start"
                onClick={() => handleToggleDrawer(true)}
              >
                <MenuIcon
                  sx={{
                    color: theme.palette.monmartBlue.main,
                    fontSize: theme.spacing(4),
                  }}
                />
              </IconButton>
            )}

            <Box component={RouterLink} to="/">
              {matchedMdDown ? (
                <img src={brandLogoOnly} alt="logo" height="60" />
              ) : (
                <img src={brandLogo} alt="logo" height="60" />
              )}
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: theme.palette.monmartRed.main }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />

            {!matchedSmDown && (
              <Stack direction="row">
                <StyledAppbarButton
                  variant="text"
                  startIcon={<FavoriteBorderIcon />}
                  disableRipple={true}
                  onClick={handleFavItemMenuClick}
                >
                  Favorite
                </StyledAppbarButton>

                <StyledAppbarButton
                  variant="text"
                  startIcon={
                    <Badge badgeContent={cartSize} color="monmartOrange">
                      <ShoppingCartCheckoutIcon />
                    </Badge>
                  }
                  disableRipple={true}
                  onClick={handleCartButtonClick}
                >
                  Cart
                </StyledAppbarButton>

                {auth.data && auth.data.isLoggedIn ? (
                  <IconButton onClick={handleSignInClick}>
                    <Avatar
                      disableRipple={true}
                      sx={{
                        bgcolor: theme.palette.monmartPink.main,
                        color: theme.palette.monmartBlue.main,
                        fontWeight: 'bold',
                      }}
                    >
                      {auth.data.email[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                ) : (
                  <Button
                    variant="contained"
                    color="monmartPink"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleSignInClick}
                    sx={{
                      textTransform: 'none',
                      fontSize: '.9rem',
                      '& .MuiButton-endIcon': { margin: 0 },
                      ml: 1.5,
                      mr: 2.5,
                      my: 'auto',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Sign in
                  </Button>
                )}
              </Stack>
            )}

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleSignInMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {signInBox}
            </Popover>

            <Popover
              id="fav-item-menu"
              anchorEl={favItemsAnchorEl}
              open={favItemMenuOpen}
              onClose={handleFavItemMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {slicedFavItemsList && slicedFavItemsList.length > 0 ? (
                <List>
                  {slicedFavItemsList.map((product) => (
                    <>
                      <ListItem
                        disablePadding
                        component={RouterLink}
                        to={`/product/${product._id}`}
                        onClick={handleFavItemMenuClose}
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <FindInPageIcon color="monmartPink" />
                          </ListItemIcon>
                          <ListItemText
                            primary={product.name}
                            secondary={`${bdtSign} ${product.price}`}
                            sx={{
                              '& .MuiListItemText-secondary': {
                                color: theme.palette.monmartOrange.main,
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider variant="middle" />
                    </>
                  ))}
                  {favItemsList && favItemsList.length > 4 && (
                    <ListItem component={RouterLink} to="/watchlist">
                      <Typography sx={{ mx: 'auto' }}>See All</Typography>
                    </ListItem>
                  )}
                </List>
              ) : (
                <Box sx={{ p: 1.5 }}>No item added in favorite list</Box>
              )}
            </Popover>
          </Toolbar>
        </AppBar>

        <Toolbar sx={{ height: `${appbarHeight}px` }} />
      </Box>
    </>
  );
};

export default Header;
