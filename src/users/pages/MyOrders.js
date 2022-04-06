import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  useTheme,
  Typography,
  Paper,
} from '@mui/material';

import { backEndServer } from '../../constants/common';

const MyOrders = () => {
  const [orders, setOrders] = useState(null);

  const navigate = useNavigate();

  const theme = useTheme();

  const auth = useSelector((state) => state.auth);

  const getOrdersByUser = async (user) => {
    try {
      const config = { headers: { Authorization: 'Bearer ' + user.token } };
      const response = await axios.get(
        `${backEndServer}/api/orders/user/${user.id}`,
        config
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  };

  useEffect(() => {
    getOrdersByUser(auth.data);
  }, [auth.data]);

  if (!auth.data || auth.data.isLoggedIn === false) {
    navigate('/signup');
  }

  return (
    <Paper sx={{ mt: 5, mx: 'auto', bgcolor: 'white', maxWidth: '1000px' }}>
      {orders ? (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.monmartPink.main,
                  color: 'white',
                }}
              >
                <TableCell>Order No.</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Delivered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(odd)': {
                      backgroundColor: '#F5FEFD',
                    },
                  }}
                >
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>
                    {row.orderItems.map((item) => (
                      <Link
                        key={item.product}
                        sx={{ display: 'block' }}
                        component={RouterLink}
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </TableCell>
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell>
                    <Checkbox checked={row.isDelivered} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" sx={{ py: 2 }}>
          No item to show
        </Typography>
      )}
    </Paper>
  );
};

export default MyOrders;
