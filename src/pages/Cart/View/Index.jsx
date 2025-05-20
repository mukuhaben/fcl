import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material"
import { KeyboardArrowDown, ArrowBack, KeyboardArrowUp, DeleteOutline } from "@mui/icons-material"
import softChairsImage from "../../../assets/images/1.png"
import sofaChairImage from "../../../assets/images/2.png"
import kitchenDishesImage from "../../../assets/images/11.png"
import smartWatchesImage from "../../../assets/images/8.png"
import kitchenMixerImage from "../../../assets/images/9.png"
import homeApplianceImage from "../../../assets/images/10.png"
import coffeeMakerImage from "../../../assets/images/13.png"
import NewsletterSubscription from "../../../components/NewsLetter"

// Helper function to format numbers with commas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

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
      price: 79000, // Removed decimals
      cashbackPercent: 5, // 5% cashback
      image: softChairsImage,
      itemCode: "SC001",
    },
    {
      id: "item2",
      name: "T-shirts with multiple colors, for men and lady",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Best factory LLC",
      price: 39000, // Removed decimals
      cashbackPercent: 5, // 5% cashback
      image: sofaChairImage,
      itemCode: "TS001",
    },
    {
      id: "item3",
      name: "T-shirts with multiple colors, for men and lady",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artist Market",
      price: 171000, // Removed decimals
      cashbackPercent: 5, // 5% cashback
      image: kitchenDishesImage,
      itemCode: "TS002",
    },
  ]

  // State for cart items
  const [cartItems, setCartItems] = useState([])

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    if (storedCartItems.length > 0) {
      setCartItems(storedCartItems)
    } else {
      // If no items in localStorage, use the initial items
      setCartItems(initialCartItems)
    }
  }, [])

  // State for quantity selectors
  const [quantities, setQuantities] = useState({})

  // Initialize quantities for cart items
  useEffect(() => {
    const initialQuantities = {}
    cartItems.forEach((item) => {
      initialQuantities[item.id] = 1
    })
    setQuantities(initialQuantities)
  }, [cartItems])

  // RESPONSIVE CHANGE 2: Add theme and isMobile detection
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallLaptop = useMediaQuery(theme.breakpoints.down("lg"))

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
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCartItems)

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
  }

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * (quantities[item.id] || 1)
  }, 0)

  // Calculate cashback based on percentage
  const calculateCashback = (item, quantity) => {
    const cashbackPercent = item.cashbackPercent || 0
    return Math.round((item.price * quantity * cashbackPercent) / 100)
  }

  const totalCashback = cartItems.reduce((sum, item) => {
    return sum + calculateCashback(item, quantities[item.id] || 1)
  }, 0)

  // Discount commented out as requested
  // const discount = 60
  const tax = 14000
  const total = subtotal + tax

  // Clear cart function
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cartItems")
  }

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
                  onClick={() => (window.location.href = "/")}
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
                        {/* Item Code Chip */}
                        <Chip
                          label={`Item Code: ${item.itemCode || "N/A"}`}
                          size="small"
                          sx={{
                            mb: 1,
                            fontSize: "0.85rem", // Increased font size
                            height: "24px", // Increased height
                            backgroundColor: "#f0f7ff",
                            color: theme.palette.primary.main,
                          }}
                        />
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
                                fontSize: "1rem", // Increased font size
                              }}
                            >
                              {quantities[item.id] || 1}
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
                        <Typography variant="body1" fontWeight="bold" align="right" sx={{ fontSize: "1.1rem" }}>
                          {formatNumberWithCommas(item.price)}/=
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="success.main" sx={{ fontSize: "0.95rem" }}>
                          Cashback: {formatNumberWithCommas(calculateCashback(item, quantities[item.id] || 1))}/=
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body1" fontWeight="bold" align="right" sx={{ fontSize: "1.1rem" }}>
                          Total: {formatNumberWithCommas(item.price * (quantities[item.id] || 1))}/=
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
                              fontSize: "0.9rem", // Increased font size
                            }}
                          >
                            Remove
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
                          <Typography variant="body1" fontWeight="medium" gutterBottom sx={{ fontSize: "1rem" }}>
                            {item.name}
                          </Typography>
                          {/* Item Code */}
                          <Chip
                            label={`Item Code: ${item.itemCode || "N/A"}`}
                            size="small"
                            sx={{
                              mb: 1,
                              fontSize: "0.85rem", // Increased font size
                              height: "24px", // Increased height
                              backgroundColor: "#f0f7ff",
                              color: theme.palette.primary.main,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>
                            Size: {item.size}, Color: {item.color}, Material: {item.material || "N/A"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>
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
                                fontSize: "0.95rem", // Increased font size
                              }}
                            >
                              {quantities[item.id] || 1}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={(quantities[item.id] || 1) <= 1}
                              sx={{ p: 0.5 }}
                            >
                              <KeyboardArrowDown fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        {/* Price with /= and commas */}
                        <TableCell align="right" sx={{ fontSize: "1rem" }}>
                          {formatNumberWithCommas(item.price)}/=
                        </TableCell>
                        <TableCell align="right" sx={{ color: "success.main", fontSize: "1rem" }}>
                          {formatNumberWithCommas(calculateCashback(item, quantities[item.id] || 1))}/=
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                          {formatNumberWithCommas(item.price * (quantities[item.id] || 1))}/=
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
                                fontSize: "0.9rem", // Increased font size
                              }}
                            >
                              <DeleteOutline fontSize="small" />
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
                  fontSize: "1rem", // Increased font size
                }}
                onClick={() => (window.location.href = "/")}
              >
                Back to shop
              </Button>

              <Button
                variant="text"
                color="primary"
                onClick={clearCart}
                fullWidth={isMobile}
                sx={{ textTransform: "none", fontSize: "1rem" }} // Increased font size
              >
                Remove all
              </Button>
            </Box>
          )}
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
                Cashback Earned:
              </Typography>
              <Typography variant="body1" color="success.main" sx={{ fontSize: "1.05rem" }}>
                {formatNumberWithCommas(totalCashback)}/=
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2, fontSize: "0.95rem" }}>
              Cashback will be added to your e-wallet after purchase completion
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
                  Subtotal Exclusive vat:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
                  {formatNumberWithCommas(subtotal)}/=
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>
                  VAT:
                </Typography>
                <Typography variant="body1" color="primary" sx={{ fontSize: "1.05rem" }}>
                  + {formatNumberWithCommas(tax)}/=
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Total:
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {formatNumberWithCommas(total)}/=
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
                fontSize: { xs: "1.1rem", md: "1rem" },
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
