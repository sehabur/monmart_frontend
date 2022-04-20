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
// import { useState } from 'react';

function App() {
  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  // const [status, setStatus] = useState(null);

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     setStatus('Geolocation is not supported by your browser');
  //   } else {
  //     setStatus('Locating...');
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setStatus(null);
  //         setLat(position.coords.latitude);
  //         setLng(position.coords.longitude);
  //       },
  //       () => {
  //         setStatus('Unable to retrieve your location');
  //       }
  //     );
  //   }
  // };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* <div className="App">
            <button onClick={getLocation}>Get Location</button>
            <h1>Coordinates</h1>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
          </div> */}

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
