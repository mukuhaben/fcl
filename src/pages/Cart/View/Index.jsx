import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Stack,
  InputAdornment,
} from '@mui/material';
import {
  ShoppingCart,
  KeyboardArrowDown,
  ArrowBack,
  Lock,
  Headset,
  LocalShipping,
} from '@mui/icons-material';
import softChairsImage from '../../../assets/images/1.png';
import sofaChairImage from '../../../assets/images/2.png';
import kitchenDishesImage from '../../../assets/images/11.png';
import smartWatchesImage from '../../../assets/images/8.png';
import kitchenMixerImage from '../../../assets/images/9.png';
import blendersImage from '../../../assets/images/12.png';
import homeApplianceImage from '../../../assets/images/10.png';
import coffeeMakerImage from '../../../assets/images/13.png';
import NewsletterSubscription from '../../../components/NewsLetter';

export default function Cart() {
  // State for quantity selectors
  const [quantities, setQuantities] = useState({
    item1: 9,
    item2: 3,
    item3: 1,
  });
  
  // State for coupon input
  const [coupon, setCoupon] = useState('');

  // Handler for quantity change
  const handleQuantityChange = (item, value) => {
    setQuantities({
      ...quantities,
      [item]: value,
    });
  };
  
  // Handler for coupon input change
  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  // Mock cart items data
  const cartItems = [
    {
      id: 'item1',
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artist Market',
      price: 78.99,
      image: softChairsImage,
    },
    {
      id: 'item2',
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Best factory LLC',
      price: 39.00,
      image: sofaChairImage,
    },
    {
      id: 'item3',
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artist Market',
      price: 170.50,
      image: kitchenDishesImage,
    },
  ];

  // Mock saved items
  const savedItems = [
    {
      id: 'saved1',
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: smartWatchesImage,
    },
    {
      id: 'saved2',
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: kitchenMixerImage,
    },
    {
      id: 'saved3',
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: blendersImage,
    },
    {
      id: 'saved4',
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      image: homeApplianceImage,
    },
  ];

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * quantities[item.id]);
  }, 0);
  
  const discount = 60.00;
  const tax = 14.00;
  const total = subtotal - discount + tax;

  return (
    <Box sx={{ px:3 ,py: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        My cart (3)
      </Typography>
      
      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ mb: 3 }}>
            {cartItems.map((item, index) => (
              <Box key={item.id}>
                {index > 0 && <Divider />}
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2} sm={1}>
                      <Box 
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{ 
                          width: '100%',
                          maxWidth: 70,
                          height: 'auto',
                          objectFit: 'contain'
                        }}
                      />
                    </Grid>
                    <Grid item xs={10} sm={7}>
                      <Typography variant="body1" fontWeight="medium" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {item.size}, Color: {item.color}, Material: {item.material}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Seller: {item.seller}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          color="error" 
                          sx={{ 
                            borderRadius: 1,
                            textTransform: 'none',
                            minWidth: 'auto',
                            px: 1.5
                          }}
                        >
                          Remove
                        </Button>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          color="primary" 
                          sx={{ 
                            ml: 1, 
                            borderRadius: 1,
                            textTransform: 'none',
                            minWidth: 'auto',
                            px: 1.5
                          }}
                        >
                          Save for later
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={2} textAlign="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          Qty:
                        </Typography>
                        <Select
                          value={quantities[item.id]}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          size="small"
                          sx={{ 
                            width: 70,
                            '.MuiSelect-select': { py: 0.5 },
                          }}
                          IconComponent={KeyboardArrowDown}
                        >
                          {['1', '1-6', '1-12'].map((num) => (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={2} textAlign="right">
                      <Typography variant="h6" fontWeight="bold">
                        KSH{item.price.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBack />}
              sx={{ 
                textTransform: 'none',
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              Back to shop
            </Button>
            
            <Button
              variant="text"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Remove all
            </Button>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    height: '100%'
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: '#f0f0f0', 
                      borderRadius: '50%', 
                      p: 1, 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Lock color="action" />
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Secure payment
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Have you ever finally just
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={4}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    height: '100%'
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: '#f0f0f0', 
                      borderRadius: '50%', 
                      p: 1, 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Headset color="action" />
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Customer support
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Have you ever finally just
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={4}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    height: '100%'
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: '#f0f0f0', 
                      borderRadius: '50%', 
                      p: 1, 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <LocalShipping color="action" />
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Free delivery
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Have you ever finally just
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mb: 4, }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mt={2}>
              Saved for later
            </Typography>
            
            <Grid container spacing={2}>
              {savedItems.map((item) => (
                <Grid item xs={6} sm={3} key={item.id}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'contain', p: 2 }}
                    />
                    <CardContent sx={{ pt: 1, pb: 0 }}>
                      <Typography variant="h6" fontWeight="bold">
                        KSH{item.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                        {item.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ShoppingCart />}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Move to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        
        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              Have a coupon?
            </Typography>
            
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField 
                placeholder="Add coupon" 
                size="small"
                value={coupon}
                onChange={handleCouponChange}
                sx={{ 
                  flexGrow: 1,
                  mr: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px'
                  }
                }}
              />
              <Button 
                variant="text" 
                color="primary"
                sx={{ textTransform: 'none' }}
              >
                Apply
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">KSH{subtotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Discount:</Typography>
                <Typography variant="body1" color="error">- KSH{discount.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Tax:</Typography>
                <Typography variant="body1" color="primary">+ KSH{tax.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">CashBack:</Typography>
                <Typography variant="body1" color="primary">+ KSH{tax.toFixed(2)}</Typography>
              </Box>
            </Stack>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Total:</Typography>
              <Typography variant="h6" fontWeight="bold">KSH{total.toFixed(2)}</Typography>
            </Box>
            
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              sx={{ 
                textTransform: 'none',
                py: 1.5,
                bgcolor: '#00a152',
                '&:hover': { bgcolor: '#00873e' }
              }}
            >
              Checkout
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Box 
                component="img" 
                src={homeApplianceImage} 
                alt="visa"
                sx={{ height: 24, mx: 0.5 }}
              />
              <Box 
                component="img" 
                src={coffeeMakerImage} 
                alt="mastercard"
                sx={{ height: 24, mx: 0.5 }}
              />
              <Box 
                component="img" 
                src={kitchenMixerImage} 
                alt="paypal"
                sx={{ height: 24, mx: 0.5 }}
              />
              <Box 
                component="img" 
                src={smartWatchesImage} 
                alt="visa"
                sx={{ height: 24, mx: 0.5 }}
              />
              <Box 
                component="img" 
                src={kitchenDishesImage} 
                alt="apple pay"
                sx={{ height: 24, mx: 0.5 }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <NewsletterSubscription />
    </Box>
  );
}