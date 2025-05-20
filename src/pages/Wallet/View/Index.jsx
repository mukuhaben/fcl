import React, { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material"
import {
  AccountBalanceWallet,
  ArrowUpward,
  History,
  Close,
  CheckCircle,
  LocalAtm,
  Info,
  Warning,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

// Mock cashback transaction data with item codes and percentages
// Each transaction represents a purchase that earned cashback
const mockCashbackTransactions = [
  {
    id: 1,
    itemCode: "SC001",
    orderNo: "ORD-2023-001",
    date: "2023-06-15",
    productName: "Soft Chair",
    purchaseAmount: 80, // Rounded to whole number
    cashbackPercent: 5,
    cashbackAmount: 4, // Rounded to whole number
    status: "completed",
  },
  {
    id: 2,
    itemCode: "KM001",
    orderNo: "ORD-2023-002",
    date: "2023-06-10",
    productName: "Kitchen Mixer",
    purchaseAmount: 150, // Rounded to whole number
    cashbackPercent: 15,
    cashbackAmount: 23, // Rounded to whole number
    status: "completed",
  },
  {
    id: 3,
    itemCode: "SW001",
    orderNo: "ORD-2023-003",
    date: "2023-05-28",
    productName: "Smart Watch",
    purchaseAmount: 100, // Rounded to whole number
    cashbackPercent: 10,
    cashbackAmount: 10, // Rounded to whole number
    status: "completed",
  },
  {
    id: 4,
    itemCode: "BL001",
    orderNo: "ORD-2023-004",
    date: "2023-05-20",
    productName: "Blender",
    purchaseAmount: 35, // Rounded to whole number
    cashbackPercent: 8,
    cashbackAmount: 3, // Rounded to whole number
    status: "completed",
  },
  {
    id: 5,
    itemCode: "CM001",
    orderNo: "ORD-2023-005",
    date: "2023-05-15",
    productName: "Coffee Maker",
    purchaseAmount: 50, // Rounded to whole number
    cashbackPercent: 12,
    cashbackAmount: 6, // Rounded to whole number
    status: "completed",
  },
]

// Mock withdrawal history
// Records of when users withdrew their cashback to external payment methods
const mockWithdrawals = [
  {
    id: 1,
    type: "withdrawal",
    amount: 30, // Rounded to whole number
    date: "2023-06-01",
    status: "completed",
    method: "M-Pesa",
    reference: "WD-2023-001",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 15, // Rounded to whole number
    date: "2023-05-10",
    status: "completed",
    method: "Bank Account",
    reference: "WD-2023-002",
  },
]

// Mock payment methods
// Available methods for withdrawing cashback
const mockPaymentMethods = [
  {
    id: 1,
    type: "card",
    name: "Visa ending in 4242",
    details: "**** **** **** 4242",
    expiryDate: "05/25",
    isDefault: false,
  },
  {
    id: 2,
    type: "mobile",
    name: "M-Pesa",
    details: "+254 722 123 456",
    isDefault: true,
  },
  {
    id: 3,
    type: "bank",
    name: "Bank Account",
    details: "Equity Bank ****1234",
    isDefault: false,
  },
]

const WalletPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()

  // Calculate total cashback from transactions
  // This function computes the available balance by subtracting withdrawals from earned cashback
  const calculateTotalCashback = () => {
    const totalEarned = mockCashbackTransactions.reduce((sum, transaction) => sum + transaction.cashbackAmount, 0)
    const totalWithdrawn = mockWithdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0)
    return totalEarned - totalWithdrawn
  }

  // State for cashback balance
  const [cashbackBalance, setCashbackBalance] = useState(0)

  // Update cashback balance on component mount
  useEffect(() => {
    setCashbackBalance(calculateTotalCashback())
  }, [])

  // State for dialogs
  const [withdrawDialog, setWithdrawDialog] = useState(false)

  // State for transaction history tab
  const [historyTab, setHistoryTab] = useState(0)

  // State for withdraw amount
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  // State for success message
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Handle withdraw
  // This function processes a cashback withdrawal request
  const handleWithdraw = () => {
    if (!amount || !paymentMethod) {
      setErrorMessage("Please enter an amount and select a payment method")
      return
    }

    const withdrawAmount = Number.parseFloat(amount)

    if (withdrawAmount < 100) {
      setErrorMessage("Minimum withdrawal amount is KSH 100")
      return
    }

    if (withdrawAmount > cashbackBalance) {
      setErrorMessage("Insufficient balance")
      return
    }

    // In a real app, you would process the withdrawal through an API
    setCashbackBalance(cashbackBalance - withdrawAmount)

    // Add to withdrawals
    const newWithdrawal = {
      id: mockWithdrawals.length + 1,
      type: "withdrawal",
      amount: Math.round(withdrawAmount), // Round to whole number
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      method: paymentMethod === "1" ? "Visa ending in 4242" : paymentMethod === "2" ? "M-Pesa" : "Bank Account",
      reference: `WD-2023-${mockWithdrawals.length + 1}`,
    }

    // In a real app, you would update this in the server/state management
    mockWithdrawals.unshift(newWithdrawal)

    // Reset form and close dialog
    setAmount("")
    setPaymentMethod("")
    setWithdrawDialog(false)

    // Show success message
    setSuccessMessage("Withdrawal successful! Your cashback has been sent to your selected payment method.")
    setTimeout(() => setSuccessMessage(""), 5000)
  }

  // Handle history tab change
  const handleHistoryTabChange = (event, newValue) => {
    setHistoryTab(newValue)
  }

  // Clear error message
  const clearErrorMessage = () => {
    setErrorMessage("")
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Message */}
      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => setSuccessMessage("")}>
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {successMessage}
        </Alert>
      )}

      {/* Error Message */}
      {errorMessage && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={clearErrorMessage}>
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* E-Wallet Balance Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: "white",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccountBalanceWallet sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" component="h1">
                    E-Wallet Balance
                  </Typography>
                </Box>
                <Typography variant="h3" component="p" sx={{ mb: 1, fontWeight: "bold" }}>
                  {Math.round(cashbackBalance)}/= {/* Rounded to whole number */}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Chip
                    icon={<CheckCircle sx={{ color: "white !important" }} />}
                    label="Available for withdrawal"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      "& .MuiChip-icon": { color: "white" },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<ArrowUpward />}
                    onClick={() => setWithdrawDialog(true)}
                    disabled={cashbackBalance < 100}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      color: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: "white",
                      },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255, 255, 255, 0.5)",
                        color: "rgba(0, 0, 0, 0.4)",
                      },
                    }}
                  >
                    Withdraw Cashback
                  </Button>
                  {cashbackBalance < 100 && (
                    <Typography variant="caption" sx={{ color: "white", textAlign: "center" }}>
                      Minimum withdrawal: KSH 100/=
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Transaction History */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="h2">
                Cashback History
              </Typography>
              <Chip icon={<History />} label="All transactions" color="primary" variant="outlined" size="small" />
            </Box>

            <Tabs
              value={historyTab}
              onChange={handleHistoryTabChange}
              sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Cashback Earned" />
              <Tab label="Withdrawals" />
            </Tabs>

            {historyTab === 0 ? (
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size={isMobile ? "small" : "medium"}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                      <TableCell>Date</TableCell>
                      <TableCell>Order No.</TableCell>
                      <TableCell>Item Code</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Purchase Amount</TableCell>
                      <TableCell align="center">Cashback %</TableCell>
                      <TableCell align="right">Cashback Earned</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockCashbackTransactions.map((transaction) => (
                      <TableRow key={transaction.id} hover>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.orderNo}</TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.itemCode}
                            size="small"
                            sx={{
                              fontSize: "0.7rem",
                              height: "20px",
                              backgroundColor: "#f0f7ff",
                              color: theme.palette.primary.main,
                            }}
                          />
                        </TableCell>
                        <TableCell>{transaction.productName}</TableCell>
                        <TableCell align="right">{transaction.purchaseAmount}/=</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${transaction.cashbackPercent}%`}
                            size="small"
                            color="error"
                            sx={{ fontSize: "0.7rem", height: "20px" }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", color: "success.main" }}>
                          {transaction.cashbackAmount}/=
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ backgroundColor: "rgba(76, 175, 80, 0.08)" }}>
                      <TableCell colSpan={6} align="right" sx={{ fontWeight: "bold" }}>
                        Total Cashback Earned:
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold", color: "success.main" }}>
                        {mockCashbackTransactions.reduce((sum, transaction) => sum + transaction.cashbackAmount, 0)}/=
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size={isMobile ? "small" : "medium"}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                      <TableCell>Date</TableCell>
                      <TableCell>Reference</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockWithdrawals.length > 0 ? (
                      <>
                        {mockWithdrawals.map((withdrawal) => (
                          <TableRow key={withdrawal.id} hover>
                            <TableCell>{withdrawal.date}</TableCell>
                            <TableCell>{withdrawal.reference}</TableCell>
                            <TableCell>{withdrawal.method}</TableCell>
                            <TableCell>
                              <Chip
                                label={withdrawal.status}
                                size="small"
                                color={withdrawal.status === "completed" ? "success" : "warning"}
                                sx={{ fontSize: "0.7rem", height: "20px" }}
                              />
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                              {withdrawal.amount}/=
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow sx={{ backgroundColor: "rgba(76, 175, 80, 0.08)" }}>
                          <TableCell colSpan={4} align="right" sx={{ fontWeight: "bold" }}>
                            Total Withdrawn:
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            {mockWithdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0)}/=
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                          <Typography variant="body1" color="text.secondary">
                            No withdrawals yet
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Mobile view for transaction history */}
            {isMobile && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Swipe horizontally to view all transaction details
                </Typography>
              </Box>
            )}

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Cashback Policy:</strong> Cashback is earned on all eligible purchases and can be withdrawn once
                you have accumulated a minimum of KSH 100/=.
              </Typography>
            </Alert>
          </Paper>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Withdrawal Information */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Withdrawal Information
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight="bold">
                Minimum withdrawal amount: KSH 100/=
              </Typography>
            </Alert>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                Available for Withdrawal
              </Typography>
              <Typography variant="h5" color="success.main">
                {Math.round(cashbackBalance)}/= {/* Rounded to whole number */}
              </Typography>
              {cashbackBalance < 100 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  You need {Math.round(100 - cashbackBalance)}/= more to reach the minimum withdrawal amount.
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              fullWidth
              startIcon={<ArrowUpward />}
              onClick={() => setWithdrawDialog(true)}
              disabled={cashbackBalance < 100}
              sx={{ mb: 2 }}
            >
              Withdraw Cashback
            </Button>

           
          </Paper>

       {/*  {/* Payment Methods *
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="h2">
                Withdrawal Methods
              </Typography>
              <Tooltip title="You can withdraw your cashback to any of these payment methods">
                <IconButton size="small">
                  <Info fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <List sx={{ width: "100%" }}>
              {mockPaymentMethods.map((method) => (
                <React.Fragment key={method.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      method.isDefault && (
                        <Chip label="Default" size="small" color="primary" sx={{ height: 20, fontSize: "0.7rem" }} />
                      )
                    }
                  >
                   <ListItemIcon>
                      {method.type === "card" ? <LocalAtm /> : method.type === "mobile" ? <LocalAtm /> : <LocalAtm />}
                    </ListItemIcon>
                    <ListItemText primary={method.name} secondary={method.details} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment> 
              ))}  
            </List>

           <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/account")}
              sx={{ mt: 2, textTransform: "none" }}
            >
              Manage Payment Methods
            </Button>  
          </Paper>   */}

          {/* Cashback Information */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              About Cashback
            </Typography>

            <Typography variant="body2" paragraph>
              <strong>How Cashback Works:</strong>
            </Typography>

            <List sx={{ pl: 2 }}>
              <ListItem sx={{ display: "list-item", p: 0, mb: 1 }}>
                <Typography variant="body2">
                  Earn cashback on every eligible purchase based on the product's cashback percentage.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "list-item", p: 0, mb: 1 }}>
                <Typography variant="body2">
                  Cashback is calculated on the product price and added to your balance after purchase.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "list-item", p: 0, mb: 1 }}>
                <Typography variant="body2">
                  Withdraw your cashback once you've accumulated a minimum of KSH 100/=.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "list-item", p: 0 }}>
                <Typography variant="body2">
                  Choose your preferred withdrawal method: M-Pesa.
                </Typography>
              </ListItem>
            </List>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Need help with your cashback? Contact our support team at support@firstcraft.com
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialog} onClose={() => setWithdrawDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Withdraw Cashback
          <IconButton
            aria-label="close"
            onClick={() => setWithdrawDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Withdraw your cashback to one of your saved payment methods.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Available Balance
            </Typography>
            <Typography variant="h6" color="success.main">
              {Math.round(cashbackBalance)}/= {/* Rounded to whole number */}
            </Typography>
          </Box>

          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">KES</InputAdornment>,
            }}
            error={
              Number.parseFloat(amount) > cashbackBalance ||
              (Number.parseFloat(amount) > 0 && Number.parseFloat(amount) < 100)
            }
            helperText={
              Number.parseFloat(amount) > cashbackBalance
                ? "Amount exceeds available balance"
                : Number.parseFloat(amount) > 0 && Number.parseFloat(amount) < 100
                  ? "Minimum withdrawal amount is KSH 100/="
                  : ""
            }
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Withdraw To</InputLabel>
            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} label="Withdraw To">
              {mockPaymentMethods.map((method) => (
                <MenuItem key={method.id} value={method.id}>
                  {method.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Warning sx={{ mr: 1, mt: 0.5 }} fontSize="small" />
              <Typography variant="body2">
                <strong>Important:</strong> Minimum withdrawal amount is KSH 100/=. M-Pesa withdrawals are typically processed instantly.
              </Typography>
            </Box>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWithdrawDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleWithdraw}
            disabled={
              !amount ||
              !paymentMethod ||
              Number.parseFloat(amount) > cashbackBalance ||
              Number.parseFloat(amount) < 100
            }
          >
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default WalletPage
