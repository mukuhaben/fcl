import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import IndexPage from './pages/Home/View';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails/View/Index';
import Cart from './pages/Cart/View/Index';
import RegisterPage from './pages/Registration/View/Index';
import LoginPage from './pages/Login/View/Index';

function App() {
  // Detect preferred color scheme (light/dark mode)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  
  // Create a responsive theme
  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#0056B3',
          },
          secondary: {
            main: '#800080',
          },
          success: {
            main: '#4CAF50',
          }
        },
        // Add responsive breakpoints configuration
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
        // Add responsive spacing
        spacing: (factor) => `${0.25 * factor}rem`,
        // Add responsive typography
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: '2.5rem',
            '@media (min-width:600px)': {
              fontSize: '3rem',
            },
            '@media (min-width:900px)': {
              fontSize: '3.5rem',
            },
          },
          // Add more responsive typography settings for other elements
        },
        components: {
          // Add global component overrides for better responsiveness
          MuiContainer: {
            styleOverrides: {
              root: {
                paddingLeft: '16px',
                paddingRight: '16px',
                '@media (min-width:600px)': {
                  paddingLeft: '24px',
                  paddingRight: '24px',
                },
              },
            },
          },
        },
      }),
    [prefersDarkMode],
  );
  
  // Apply responsive font sizes
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides consistent baseline styles */}
      <CssBaseline />
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavigationBar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;