"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  TextField,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // RESPONSIVE CHANGE 1: Add useMediaQuery and useTheme for responsive detection
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  ShoppingCart,
  KeyboardArrowDown,
  ArrowBack,
  Lock,
  Headset,
  LocalShipping,
  KeyboardArrowUp,
  DeleteOutline,
} from "@mui/icons-material"
import softChairsImage from "../../../assets/images/1.png"
import sofaChairImage from "../../../assets/images/2.png"
import kitchenDishesImage from "../../../assets/images/11.png"
import smartWatchesImage from "../../../assets/images/8.png"
import kitchenMixerImage from "../../../assets/images/9.png"
import blendersImage from "../../../assets/images/12.png"
import homeApplianceImage from "../../../assets/images/10.png"
import coffeeMakerImage from "../../../assets/images/13.png"
import NewsletterSubscription from "../../../components/NewsLetter"

export default function Cart() {
  // Initial cart items data with cashback added
  const initialCartItems = [
    {
      id: "item1",
      name: "Chair..................................",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artist Market",
      price: 78.99,
      cashback: 3.95, // 5% cashback
      image: softChairsImage,
    },
    {
      id: "item2",
      name: "T-shirts with multiple colors, for men and lady",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Best factory LLC",
      price: 39.0,
      cashback: 1.95, // 5% cashback
      image: sofaChairImage,
    },
    {
      id: "item3",
      name: "T-shirts with multiple colors, for men and lady",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artist Market",
      price: 170.5,
      cashback: 8.53, // 5% cashback
      image: kitchenDishesImage,
    },
  ]

  // State for cart items
  const [cartItems, setCartItems] = useState(initialCartItems)

  // State for saved items
  const [savedItems, setSavedItems] = useState([
    {
      id: "saved1",
      name: "GoPro HERO6 4K Action Camera - Black",
      price: 99.5,
      cashback: 4.98,
      image: smartWatchesImage,
    },
    {
      id: "saved2",
      name: "GoPro HERO6 4K Action Camera - Black",
      price: 99.5,
      cashback: 4.98,
      image: kitchenMixerImage,
    },
    {
      id: "saved3",
      name: "GoPro HERO6 4K Action Camera - Black",
      price: 99.5,
      cashback: 4.98,
      image: blendersImage,
    },
    {
      id: "saved4",
      name: "GoPro HERO6 4K Action Camera - Black",
      price: 99.5,
      cashback: 4.98,
      image: homeApplianceImage,
    },
  ])

  // State for quantity selectors
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1,
    item3: 1,
  })

  // State for coupon input
  const [coupon, setCoupon] = useState("")

  // RESPONSIVE CHANGE 2: Add theme and isMobile detection
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // RESPONSIVE CHANGE 3: Add helper function for responsive values
  const responsiveValue = (mobileValue, desktopValue) => {
    return isMobile ? mobileValue : desktopValue
  }

  // New handlers for increasing and decreasing quantity
  const increaseQuantity = (item) => {
    setQuantities({
      ...quantities,
      [item]: quantities[item] + 1,
    })
  }

  const decreaseQuantity = (item) => {
    if (quantities[item] > 1) {
      setQuantities({
        ...quantities,
        [item]: quantities[item] - 1,
      })
    }
  }

  // Handler for removing an item from the cart
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  // Handler for saving an item for later
  const saveForLater = (itemId) => {
    const itemToSave = cartItems.find((item) => item.id === itemId)
    if (itemToSave) {
      // Add to saved items with a new ID
      setSavedItems([
        ...savedItems,
        {
          ...itemToSave,
          id: `saved${savedItems.length + 1}`,
        },
      ])
      // Remove from cart
      removeItem(itemId)
    }
  }

  // Handler for moving an item from saved to cart
  const moveToCart = (savedItemId) => {
    const itemToMove = savedItems.find((item) => item.id === savedItemId)
    if (itemToMove) {
      // Create a new cart item with a unique ID
      const newCartItem = {
        ...itemToMove,
        id: `item${cartItems.length + 1}`,
      }

      // Add to cart items
      setCartItems([...cartItems, newCartItem])

      // Set initial quantity
      setQuantities({
        ...quantities,
        [newCartItem.id]: 1,
      })

      // Remove from saved items
      setSavedItems(savedItems.filter((item) => item.id !== savedItemId))
    }
  }

  // Handler for coupon input change
  const handleCouponChange = (event) => {
    setCoupon(event.target.value)
  }

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * quantities[item.id]
  }, 0)

  const totalCashback = cartItems.reduce((sum, item) => {
    return sum + item.cashback * quantities[item.id]
  }, 0)

  const discount = 60.0
  const tax = 14.0
  const total = subtotal - discount + tax

  return (
    // RESPONSIVE CHANGE 4: Add responsive padding
    <Box
      sx={{
        px: { xs: 2, md: 3 }, // Less horizontal padding on mobile
        py: { xs: 3, md: 4 }, // Less vertical padding on mobile
      }}
    >
      {/* RESPONSIVE CHANGE 5: Add responsive typography */}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "1.75rem" }, // Smaller on mobile
        }}
      >
        My cart ({cartItems.length})
      </Typography>

      {/* RESPONSIVE CHANGE 6: Update Grid container for stacking on mobile */}
      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Paper variant="outlined" sx={{ mb: 3 }}>
            {/* RESPONSIVE CHANGE 7: Conditional rendering based on screen size */}
            {cartItems.length === 0 ? (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  Your cart is empty
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowBack />}
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#1565c0" },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            ) : isMobile ? (
              // RESPONSIVE CHANGE 8: Mobile view - Card layout
              <Box>
                {cartItems.map((item) => (
                  <Paper key={item.id} sx={{ mb: 2, p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1" fontWeight="medium" gutterBottom>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Size: {item.size}, Color: {item.color}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Seller: {item.seller}
                        </Typography>
                      </Grid>

                      {/* RESPONSIVE CHANGE 9: Horizontal quantity controls for mobile */}
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            Qty:
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              border: "1px solid #c4c4c4",
                              borderRadius: "4px",
                              width: "100px",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={quantities[item.id] <= 1}
                              sx={{
                                p: 1, // Larger padding for touch targets
                              }}
                            >
                              <KeyboardArrowDown fontSize="small" />
                            </IconButton>
                            <Typography
                              variant="body2"
                              sx={{
                                flex: 1,
                                textAlign: "center",
                                userSelect: "none",
                              }}
                            >
                              {quantities[item.id]}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => increaseQuantity(item.id)}
                              sx={{
                                p: 1, // Larger padding for touch targets
                              }}
                            >
                              <KeyboardArrowUp fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body1" fontWeight="bold" align="right">
                          KSH{item.price.toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="success.main">
                          Cashback: KSH{(item.cashback * quantities[item.id]).toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body1" fontWeight="bold" align="right">
                          Total: KSH{(item.price * quantities[item.id]).toFixed(2)}
                        </Typography>
                      </Grid>

                      {/* RESPONSIVE CHANGE 10: Full-width buttons on mobile */}
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => removeItem(item.id)}
                            startIcon={<DeleteOutline />}
                            sx={{
                              borderRadius: 1,
                              textTransform: "none",
                              px: 2, // More horizontal padding for touch targets
                              py: 1, // More vertical padding for touch targets
                            }}
                          >
                            Remove
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={() => saveForLater(item.id)}
                            sx={{
                              borderRadius: 1,
                              textTransform: "none",
                              px: 2, // More horizontal padding for touch targets
                              py: 1, // More vertical padding for touch targets
                            }}
                          >
                            Save for later
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>
            ) : (
              // Desktop view - Table layout
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Product</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Cashback</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell sx={{ width: "80px", padding: "16px 8px" }}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: "100%",
                              maxWidth: 70,
                              height: "auto",
                              objectFit: "contain",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight="medium" gutterBottom>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Size: {item.size}, Color: {item.color}, Material: {item.material}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Seller: {item.seller}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              border: "1px solid #c4c4c4",
                              borderRadius: "4px",
                              width: "70px",
                              margin: "0 auto",
                            }}
                          >
                            <IconButton size="small" onClick={() => increaseQuantity(item.id)} sx={{ p: 0.5 }}>
                              <KeyboardArrowUp fontSize="small" />
                            </IconButton>
                            <Typography
                              variant="body2"
                              sx={{
                                textAlign: "center",
                                userSelect: "none",
                                py: 0.5,
                              }}
                            >
                              {quantities[item.id]}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={quantities[item.id] <= 1}
                              sx={{ p: 0.5 }}
                            >
                              <KeyboardArrowDown fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        {/*cashback price calculation logit*/}
                        <TableCell align="right">{item.price.toFixed(2)}/={/*price /=*/}</TableCell>
                        <TableCell align="right" sx={{ color: "success.main" }}>
                          {(item.cashback * quantities[item.id]).toFixed(2)}/=
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {(item.price * quantities[item.id]).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={() => removeItem(item.id)}
                              sx={{
                                borderRadius: 1,
                                textTransform: "none",
                                minWidth: "auto",
                                px: 1,
                              }}
                            >
                              <DeleteOutline fontSize="small" />
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                              onClick={() => saveForLater(item.id)}
                              sx={{
                                borderRadius: 1,
                                textTransform: "none",
                                minWidth: "auto",
                                px: 1,
                              }}
                            >
                              Save
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>

          {cartItems.length > 0 && (
            // RESPONSIVE CHANGE 11: Responsive button layout
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                mb: 4,
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                fullWidth={isMobile}
                sx={{
                  textTransform: "none",
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#1565c0" },
                }}
              >
                Back to shop
              </Button>

              <Button
                variant="text"
                color="primary"
                onClick={() => setCartItems([])}
                fullWidth={isMobile}
                sx={{ textTransform: "none" }}
              >
                Remove all
              </Button>
            </Box>
          )}

          {/* RESPONSIVE CHANGE 12: Responsive grid for info boxes */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#f0f0f0",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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

              <Grid item xs={12} sm={4}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#f0f0f0",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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

              <Grid item xs={12} sm={4}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#f0f0f0",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocalShipping color="action" />
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Delivery
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Have you ever finally just
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mt={2}>
              Saved for later ({savedItems.length})
            </Typography>

            {/* RESPONSIVE CHANGE 13: Responsive grid for saved items */}
            <Grid container spacing={2}>
              {savedItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: "contain", p: 2 }}
                    />
                    <CardContent sx={{ pt: 1, pb: 0 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {item.price.toFixed(2)}/=
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        Cashback: {item.cashback.toFixed(2)}/=
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                        {item.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ShoppingCart />}
                        size="small"
                        onClick={() => moveToCart(item.id)}
                        sx={{
                          textTransform: "none",
                          // RESPONSIVE CHANGE 14: Larger touch targets on mobile
                          px: { xs: 2, md: 1 },
                          py: { xs: 1, md: 0.5 },
                        }}
                      >
                        Move to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

              {savedItems.length === 0 && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="body1" color="text.secondary">
                      You don't have any saved items
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          {/* RESPONSIVE CHANGE 15: Sticky order summary on desktop */}
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 3,
              position: { xs: "static", lg: "sticky" },
              top: { lg: "20px" },
            }}
          >
            <Typography variant="body1" gutterBottom>
              Have a coupon?
            </Typography>

            <Box sx={{ display: "flex", mb: 3 }}>
              <TextField
                placeholder="Add coupon"
                size="small"
                value={coupon}
                onChange={handleCouponChange}
                sx={{
                  flexGrow: 1,
                  mr: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                }}
              />
              <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
                Apply
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">{subtotal.toFixed(2)}/=</Typography>
              </Box>

             { /****<Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Discount:</Typography>
                <Typography variant="body1" color="error">
                  - KSH{discount.toFixed(2)}
                </Typography>
              </Box>****/}

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Tax:</Typography>
                <Typography variant="body1" color="primary">
                  + {tax.toFixed(2)}/=
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">CashBack:</Typography>
                <Typography variant="body1" color="error">
                  - {totalCashback.toFixed(2)}/=
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Total:
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {(total - totalCashback).toFixed(2)}/=
              </Typography>
            </Box>

            {/* RESPONSIVE CHANGE 16: Larger checkout button on mobile */}
            <Button
              variant="contained"
              color="success"
              fullWidth
              size={isMobile ? "large" : "medium"}
              disabled={cartItems.length === 0}
              sx={{
                textTransform: "none",
                py: { xs: 1.8, md: 1.5 },
                fontSize: { xs: "1rem", md: "0.875rem" },
                bgcolor: "#00a152",
                "&:hover": { bgcolor: "#00873e" },
              }}
            >
              Checkout
            </Button>

            {/* RESPONSIVE CHANGE 17: Responsive payment icons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              <Box component="img" src={homeApplianceImage} alt="visa" sx={{ height: 24, mx: 0.5, my: 0.5 }} />
              <Box component="img" src={coffeeMakerImage} alt="mastercard" sx={{ height: 24, mx: 0.5, my: 0.5 }} />
              <Box component="img" src={kitchenMixerImage} alt="paypal" sx={{ height: 24, mx: 0.5, my: 0.5 }} />
              <Box component="img" src={smartWatchesImage} alt="visa" sx={{ height: 24, mx: 0.5, my: 0.5 }} />
              <Box component="img" src={kitchenDishesImage} alt="apple pay" sx={{ height: 24, mx: 0.5, my: 0.5 }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <NewsletterSubscription />
    </Box>
  )
}
