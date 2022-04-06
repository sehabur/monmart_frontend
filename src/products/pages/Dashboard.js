import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  Stack,
  IconButton,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FavoriteIcon from '@mui/icons-material/Favorite';

import image1 from '../../assests/beat.jpg';
import image2 from '../../assests/computer.jpg';
import image3 from '../../assests/toys.jpg';

import { productsActions } from '../../store';
import { backEndServer, bdtSign } from '../../constants/common';
import Spinner from '../../shared/components/Spinner';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const matchedMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const getAllProducts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${backEndServer}/api/products`);

      const storedFavItemData = localStorage.getItem('favItem')
        ? JSON.parse(localStorage.getItem('favItem'))
        : [];

      const products = response.data.products.map((item) => {
        if (storedFavItemData.includes(item._id)) {
          return {
            ...item,
            isFavourite: true,
          };
        } else {
          return {
            ...item,
            isFavourite: false,
          };
        }
      });
      dispatch(productsActions.getAllProducts(products));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardButtonClick = (productId) => {
    navigate(`product/${productId}`);
  };

  const handleSetFavouriteItem = (productId, isFavourite) => {
    let storedFavItem = localStorage.getItem('favItem')
      ? JSON.parse(localStorage.getItem('favItem'))
      : [];

    if (isFavourite) {
      storedFavItem = storedFavItem.filter(
        (favItemId) => productId !== favItemId
      );
    } else {
      storedFavItem.push(productId);
    }

    localStorage.setItem('favItem', JSON.stringify(storedFavItem));

    dispatch(productsActions.updateFavouriteItem({ productId, isFavourite }));
  };

  const gridProducts = (() => {
    let finalProducts = [];
    let index1 = 0;
    let index2 = 0;
    const carousalSize = matchedMdDown ? 2 : 4;

    for (let x in products) {
      if (index2 === 0) {
        finalProducts[index1] = [];
        finalProducts[index1][index2] = products[x];
        index2++;
      } else {
        finalProducts[index1][index2] = products[x];
        if (index2 === carousalSize - 1) {
          index1++;
          index2 = 0;
        } else {
          index2++;
        }
      }
    }
    return finalProducts;
  })();

  const gridItems = gridProducts.map((item) =>
    item.map((product) => (
      <Grid
        sx={{ mx: 1.5, my: 3 }}
        item
        md={2.3}
        sm={5}
        xs={9}
        key={Math.random()}
      >
        <Card>
          <Box
            onClick={() => handleCardButtonClick(product._id)}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={`${backEndServer}/${product.image}`}
              alt="green iguana"
            />
            <CardContent
              sx={{
                '& .MuiCardContent-root': {
                  bgcolor: 'red',
                  '&: last-child': {
                    paddingBottom: 0,
                  },
                },
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  display: 'inline',
                  color: 'monmartOrange.main',
                }}
              >
                {`${bdtSign} ${product.price}`}
              </Typography>
              {product.price !== product.originalPrice && (
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  sx={{
                    ml: 2,

                    display: 'inline',
                    textDecoration: 'line-through',
                  }}
                >
                  {`${bdtSign} ${product.originalPrice}`}
                </Typography>
              )}
              <Typography
                component="div"
                variant="body2"
                sx={{
                  height: '3rem',
                  textOverflow: 'ellipsis',
                  color: theme.palette.monmartBlue.main,
                  overflow: 'auto',
                }}
              >
                {product.name}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Rating
                  name="rating"
                  value={product.rating}
                  readOnly
                  precision={0.5}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ display: 'inline', fontSize: '.9rem' }}
                >
                  ({product.numReviews})
                </Typography>
              </Stack>
            </CardContent>
          </Box>

          <Stack direction="row" sx={{ px: 1.5, pb: 0.1, mb: 0.5 }}>
            <IconButton
              sx={{
                pl: 0,
              }}
              disableRipple
              onClick={() =>
                handleSetFavouriteItem(product._id, product.isFavourite)
              }
            >
              {product.isFavourite ? (
                <FavoriteIcon
                  sx={{
                    color: theme.palette.monmartOrange.main,
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    pl: 0,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: theme.palette.monmartOrange.main,
                    },
                  }}
                />
              )}
            </IconButton>

            <IconButton
              color="primary"
              sx={{
                '&:hover': {
                  bgcolor: 'transparent',
                  color: theme.palette.monmartOrange.main,
                },
              }}
              disableRipple
            >
              <ShareIcon />
            </IconButton>

            <Button
              color="monmartOrange"
              onClick={() => handleCardButtonClick(product._id)}
              sx={{
                textTransform: 'none',
                ml: 'auto',
                '& .MuiButton-endIcon': { margin: 0 },
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
              endIcon={<ArrowRightIcon />}
              disableRipple
            >
              Details
            </Button>
          </Stack>
        </Card>
      </Grid>
    ))
  );

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Spinner open={isLoading} />

      <Box>
        <Carousel
          animation="fade"
          indicators={false}
          NextIcon={
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: '3.5rem',
              }}
            />
          }
          PrevIcon={
            <ArrowBackIosRoundedIcon
              sx={{
                fontSize: '3.5rem',
              }}
            />
          }
          navButtonsProps={{
            style: {
              borderRadius: 50,
              color: theme.palette.monmartBlue.main,
              backgroundColor: 'transparent',
            },
          }}
          navButtonsWrapperProps={{
            style: {
              margin: '0 1.5rem',
            },
          }}
          // indicatorIconButtonProps={{
          //   style: {
          //     padding: '5px', // 1
          //     zIndex: 1050,
          //     color: theme.palette.monmartOrange.main,
          //   },
          // }}
          // indicatorContainerProps={{
          //   style: {
          //     marginTop: '20%', // 5
          //     textAlign: 'center', // 4
          //   },
          // }}
          // activeIndicatorIconButtonProps={{
          //   style: {
          //     color: theme.palette.monmartBlue.main,
          //   },
          // }}
          autoPlay={false}
          sx={{ height: '28vw' }}
        >
          <img src={image2} alt="image1" width="100%" height="100%" />
          <img src={image1} alt="image1" width="100%" height="100%" />
          <img src={image3} alt="image1" width="100%" height="100%" />
        </Carousel>
      </Box>

      <Box sx={{ m: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          {products &&
            products.map((product) => (
              <Grid
                sx={{ mx: 1.5, my: 3 }}
                item
                md={2.3}
                sm={5}
                xs={9}
                key={Math.random()}
              >
                <Card>
                  <Box
                    onClick={() => handleCardButtonClick(product._id)}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${backEndServer}/${product.image}`}
                      alt="green iguana"
                      sx={{ p: 1.5, pb: 0.1 }}
                    />
                    <CardContent
                      sx={{
                        '& .MuiCardContent-root': {
                          bgcolor: 'red',
                          '&: last-child': {
                            paddingBottom: 0,
                          },
                        },
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          display: 'inline',
                          color: 'monmartOrange.main',
                        }}
                      >
                        {`${bdtSign} ${product.price}`}
                      </Typography>
                      {product.price !== product.originalPrice && (
                        <Typography
                          gutterBottom
                          component="div"
                          variant="body2"
                          sx={{
                            ml: 2,

                            display: 'inline',
                            textDecoration: 'line-through',
                          }}
                        >
                          {`${bdtSign} ${product.originalPrice}`}
                        </Typography>
                      )}
                      <Typography
                        component="div"
                        variant="body2"
                        sx={{
                          height: '3rem',
                          textOverflow: 'ellipsis',
                          color: theme.palette.monmartBlue.main,
                          overflow: 'auto',
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Stack direction="row" alignItems="center">
                        <Rating
                          name="rating"
                          value={product.rating}
                          readOnly
                          precision={0.5}
                        />
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ display: 'inline', fontSize: '.9rem' }}
                        >
                          ({product.numReviews})
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Box>

                  <Stack direction="row" sx={{ px: 1.5, pb: 0.1, mb: 0.5 }}>
                    <IconButton
                      sx={{
                        pl: 0,
                      }}
                      disableRipple
                      onClick={() =>
                        handleSetFavouriteItem(product._id, product.isFavourite)
                      }
                    >
                      {product.isFavourite ? (
                        <FavoriteIcon
                          sx={{
                            color: theme.palette.monmartOrange.main,
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            pl: 0,
                            '&:hover': {
                              bgcolor: 'transparent',
                              color: theme.palette.monmartOrange.main,
                            },
                          }}
                        />
                      )}
                    </IconButton>

                    <IconButton
                      color="primary"
                      sx={{
                        '&:hover': {
                          bgcolor: 'transparent',
                          color: theme.palette.monmartOrange.main,
                        },
                      }}
                      disableRipple
                    >
                      <ShareIcon />
                    </IconButton>

                    <Button
                      color="monmartOrange"
                      onClick={() => handleCardButtonClick(product._id)}
                      sx={{
                        textTransform: 'none',
                        ml: 'auto',
                        '& .MuiButton-endIcon': { margin: 0 },
                        '&:hover': {
                          bgcolor: 'transparent',
                        },
                      }}
                      endIcon={<ArrowRightIcon />}
                      disableRipple
                    >
                      Details
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      <Box sx={{ bgcolor: 'white', mx: 10 }}>
        <Typography
          variant="h5"
          sx={{ color: theme.palette.monmartBlue.main, pl: 8, pt: 3 }}
        >
          Trending Products
        </Typography>
        <Carousel
          indicators={false}
          animation="slide"
          autoPlay={false}
          cycleNavigation={false}
          NextIcon={
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: '3.5rem',
              }}
            />
          }
          PrevIcon={
            <ArrowBackIosRoundedIcon
              sx={{
                fontSize: '3.5rem',
              }}
            />
          }
          navButtonsProps={{
            style: {
              backgroundColor: `${theme.palette.monmartOrange.main}`,
              fontSize: '2rem',
            },
          }}
        >
          {gridProducts.map((item, index) => (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              key={Math.random()}
            >
              {gridItems[index]}
            </Grid>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default Dashboard;
