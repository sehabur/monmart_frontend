import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Cart from './products/pages/Cart';
import Dashboard from './products/pages/Dashboard';
import ProductDetails from './products/pages/ProductDetails';
import Header from './shared/components/Header';
import theme from './shared/context/theme';
import store from './store';
import SignIn from './users/pages/SignIn';
import SignUp from './users/pages/SignUp';
import Checkout from './products/pages/Checkout';
import MyOrders from './users/pages/MyOrders';
import Watchlist from './users/pages/Watchlist';
import EmailVerification from './users/pages/EmailVerification';
import Copyright from './shared/components/Copyright';
import NotFound from './shared/pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth={false}
            sx={{ m: 0 }}
            disableGutters={true}
          >
            <CssBaseline />
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="product/:id" element={<ProductDetails />} />

              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="myorders" element={<MyOrders />} />
              <Route path="watchlist" element={<Watchlist />} />

              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route
                path="email_verification/user/:id"
                element={<EmailVerification />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Copyright />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
