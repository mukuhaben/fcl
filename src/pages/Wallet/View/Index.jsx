"use client"

import React, { useState } from "react"
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
} from "@mui/material"
import {
  AccountBalanceWallet,
  ArrowUpward,
  ArrowDownward,
  History,
  Add,
  CreditCard,
  ShoppingBag,
  LocalAtm,
  Close,
  ContentCopy,
  CheckCircle,
} from "@mui/icons-material"

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500,
    date: "2023-06-15",
    status: "completed",
    description: "Deposit via M-Pesa",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 200,
    date: "2023-06-10",
    status: "completed",
    description: "Withdrawal to bank account",
  },
  {
    id: 3,
    type: "purchase",
    amount: 79.99,
    date: "2023-06-05",
    status: "completed",
    description: "Purchase: Soft Chair",
  },
  {
    id: 4,
    type: "cashback",
    amount: 5.99,
    date: "2023-06-05",
    status: "completed",
    description: "Cashback: Soft Chair purchase",
  },
  {
    id: 5,
    type: "deposit",
    amount: 300,
    date: "2023-05-28",
    status: "completed",
    description: "Deposit via Credit Card",
  },
  {
    id: 6,
    type: "purchase",
    amount: 149.99,
    date: "2023-05-20",
    status: "completed",
    description: "Purchase: Kitchen Mixer",
  },
  {
    id: 7,
    type: "cashback",
    amount: 15,
    date: "2023-05-20",
    status: "completed",
    description: "Cashback: Kitchen Mixer purchase",
  },
]

// Mock payment methods
const mockPaymentMethods = [
  {
    id: 1,
    type: "card",
    name: "Visa ending in 4242",
    details: "**** **** **** 4242",
    expiryDate: "05/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "mobile",
    name: "M-Pesa",
    details: "+254 722 123 456",
    isDefault: false,
  },
]

const WalletPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // State for wallet balance
  const [walletBalance, setWalletBalance] = useState(621)
  const [cashbackBalance, setCashbackBalance] = useState(20.99)

  // State for dialogs
  const [depositDialog, setDepositDialog] = useState(false)
  const [withdrawDialog, setWithdrawDialog] = useState(false)
  const [addPaymentMethodDialog, setAddPaymentMethodDialog] = useState(false)

  // State for transaction history tab
  const [historyTab, setHistoryTab] = useState(0)

  // State for deposit/withdraw amount
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  // State for new payment method
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    phoneNumber: "",
  })

  // State for success message
  const [successMessage, setSuccessMessage] = useState("")

  // Handle deposit
  const handleDeposit = () => {
    if (!amount || !paymentMethod) {
      alert("Please enter an amount and select a payment method")
      return
    }

    // In a real app, you would process the deposit through an API
    setWalletBalance(walletBalance + Number.parseFloat(amount))

    // Add to transactions
    const newTransaction = {
      id: mockTransactions.length + 1,
      type: "deposit",
      amount: Number.parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      description: `Deposit via ${paymentMethod === "1" ? "Visa ending in 4242" : "M-Pesa"}`,
    }

    // In a real app, you would update this in the server/state management
    mockTransactions.unshift(newTransaction)

    // Reset form and close dialog
    setAmount("")
    setPaymentMethod("")
    setDepositDialog(false)

    // Show success message
    setSuccessMessage("Deposit successful! Your wallet has been updated.")
    setTimeout(() => setSuccessMessage(""), 5000)
  }

  // Handle withdraw
  const handleWithdraw = () => {
    if (!amount || !paymentMethod) {
      alert("Please enter an amount and select a payment method")
      return
    }

    if (Number.parseFloat(amount) > walletBalance) {
      alert("Insufficient balance")
      return
    }

    // In a real app, you would process the withdrawal through an API
    setWalletBalance(walletBalance - Number.parseFloat(amount))

    // Add to transactions
    const newTransaction = {
      id: mockTransactions.length + 1,
      type: "withdrawal",
      amount: Number.parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      description: `Withdrawal to ${paymentMethod === "1" ? "Visa ending in 4242" : "M-Pesa"}`,
    }

    // In a real app, you would update this in the server/state management
    mockTransactions.unshift(newTransaction)

    // Reset form and close dialog
    setAmount("")
    setPaymentMethod("")
    setWithdrawDialog(false)

    // Show success message
    setSuccessMessage("Withdrawal successful! Your wallet has been updated.")
    setTimeout(() => setSuccessMessage(""), 5000)
  }

  // Handle add payment method
  const handleAddPaymentMethod = () => {
    // Validate form
    if (newPaymentMethod.type === "card") {
      if (
        !newPaymentMethod.cardNumber ||
        !newPaymentMethod.cardName ||
        !newPaymentMethod.expiryDate ||
        !newPaymentMethod.cvv
      ) {
        alert("Please fill in all card details")
        return
      }
    } else if (newPaymentMethod.type === "mobile") {
      if (!newPaymentMethod.phoneNumber) {
        alert("Please enter your phone number")
        return
      }
    }

    // In a real app, you would process the new payment method through an API

    // Reset form and close dialog
    setNewPaymentMethod({
      type: "card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      phoneNumber: "",
    })
    setAddPaymentMethodDialog(false)

    // Show success message
    setSuccessMessage("Payment method added successfully!")
    setTimeout(() => setSuccessMessage(""), 5000)
  }

  // Handle history tab change
  const handleHistoryTabChange = (event, newValue) => {
    setHistoryTab(newValue)
  }

  // Filter transactions based on selected tab
  const filteredTransactions =
    historyTab === 0
      ? mockTransactions
      : historyTab === 1
        ? mockTransactions.filter((t) => t.type === "deposit" || t.type === "cashback")
        : mockTransactions.filter((t) => t.type === "withdrawal" || t.type === "purchase")

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

      <Grid container spacing={3}>
        {/* Wallet Balance Section */}
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
                  {walletBalance.toFixed(2)}/=
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Chip
                    icon={<CheckCircle sx={{ color: "white !important" }} />}
                    label="Available for purchases"
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
                    startIcon={<Add />}
                    onClick={() => setDepositDialog(true)}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      color: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: "white",
                      },
                    }}
                  >
                    Add Money
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowUpward />}
                    onClick={() => setWithdrawDialog(true)}
                    sx={{
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Withdraw
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Cashback Balance */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="h2">
                Cashback Balance
              </Typography>
              <Chip icon={<LocalAtm />} label="Earned from purchases" color="success" variant="outlined" size="small" />
            </Box>
            <Typography variant="h4" component="p" color="success.main" sx={{ fontWeight: "bold" }}>
              {cashbackBalance.toFixed(2)}/=
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Cashback earned from your purchases. This amount will be automatically applied to your next purchase.
            </Typography>
          </Paper>

          {/* Transaction History */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="h2">
                Transaction History
              </Typography>
              <Chip icon={<History />} label="Last 30 days" color="primary" variant="outlined" size="small" />
            </Box>

            <Tabs
              value={historyTab}
              onChange={handleHistoryTabChange}
              sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="All Transactions" />
              <Tab label="Money In" />
              <Tab label="Money Out" />
            </Tabs>

            <List sx={{ width: "100%" }}>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <React.Fragment key={transaction.id}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            color:
                              transaction.type === "deposit" || transaction.type === "cashback"
                                ? "success.main"
                                : "error.main",
                          }}
                        >
                          {transaction.type === "deposit" || transaction.type === "cashback" ? "+" : "-"}
                          {transaction.amount.toFixed(2)}/=
                        </Typography>
                      }
                    >
                      <ListItemIcon>
                        {transaction.type === "deposit" && <ArrowDownward color="success" />}
                        {transaction.type === "withdrawal" && <ArrowUpward color="error" />}
                        {transaction.type === "purchase" && <ShoppingBag color="error" />}
                        {transaction.type === "cashback" && <LocalAtm color="success" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={transaction.description}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {transaction.date}
                            </Typography>
                            {" — "}
                            <Chip
                              label={transaction.status}
                              size="small"
                              color={transaction.status === "completed" ? "success" : "warning"}
                              sx={{ height: 20, fontSize: "0.7rem" }}
                            />
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))
              ) : (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <History sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Transactions Yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your transaction history will appear here once you start using your wallet.
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Quick Actions */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Add />}
                  onClick={() => setDepositDialog(true)}
                  sx={{ textTransform: "none", py: 1.5 }}
                >
                  Add Money
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ArrowUpward />}
                  onClick={() => setWithdrawDialog(true)}
                  sx={{ textTransform: "none", py: 1.5 }}
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Payment Methods */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="h2">
                Payment Methods
              </Typography>
              <Button size="small" startIcon={<Add />} onClick={() => setAddPaymentMethodDialog(true)}>
                Add New
              </Button>
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
                    <ListItemIcon>{method.type === "card" ? <CreditCard /> : <LocalAtm />}</ListItemIcon>
                    <ListItemText primary={method.name} secondary={method.details} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Wallet Information */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Wallet Information
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Wallet ID
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  FCL-W-12345678
                </Typography>
                <IconButton size="small">
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" gutterBottom>
              About E-Wallet
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your FirstCraft E-Wallet allows you to store funds for easy shopping, earn cashback on purchases, and
              manage your payment methods securely.
            </Typography>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Need help with your wallet? Contact our support team at support@firstcraft.com
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      {/* Deposit Dialog */}
      <Dialog open={depositDialog} onClose={() => setDepositDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add Money to Wallet
          <IconButton
            aria-label="close"
            onClick={() => setDepositDialog(false)}
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
            Add money to your wallet using one of your saved payment methods.
          </Typography>

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
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Method</InputLabel>
            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} label="Payment Method">
              {mockPaymentMethods.map((method) => (
                <MenuItem key={method.id} value={method.id}>
                  {method.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Funds will be available in your wallet immediately after successful payment.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDepositDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeposit} disabled={!amount || !paymentMethod}>
            Add Money
          </Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialog} onClose={() => setWithdrawDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Withdraw Money
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
            Withdraw money from your wallet to one of your saved payment methods.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Available Balance
            </Typography>
            <Typography variant="h6" color="primary">
              {walletBalance.toFixed(2)}/=
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
            error={Number.parseFloat(amount) > walletBalance}
            helperText={Number.parseFloat(amount) > walletBalance ? "Amount exceeds available balance" : ""}
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
            <Typography variant="body2">
              Withdrawal processing time depends on your bank or mobile money provider. It may take 1-3 business days.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWithdrawDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleWithdraw}
            disabled={!amount || !paymentMethod || Number.parseFloat(amount) > walletBalance}
          >
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Method Dialog */}
      <Dialog open={addPaymentMethodDialog} onClose={() => setAddPaymentMethodDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add Payment Method
          <IconButton
            aria-label="close"
            onClick={() => setAddPaymentMethodDialog(false)}
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Method Type</InputLabel>
            <Select
              value={newPaymentMethod.type}
              onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value })}
              label="Payment Method Type"
            >
              <MenuItem value="card">Credit/Debit Card</MenuItem>
              <MenuItem value="mobile">Mobile Money</MenuItem>
            </Select>
          </FormControl>

          {newPaymentMethod.type === "card" ? (
            <>
              <TextField
                label="Card Number"
                fullWidth
                margin="normal"
                value={newPaymentMethod.cardNumber}
                onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
              />

              <TextField
                label="Cardholder Name"
                fullWidth
                margin="normal"
                value={newPaymentMethod.cardName}
                onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cardName: e.target.value })}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Expiry Date"
                    fullWidth
                    margin="normal"
                    value={newPaymentMethod.expiryDate}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CVV"
                    fullWidth
                    margin="normal"
                    value={newPaymentMethod.cvv}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cvv: e.target.value })}
                    placeholder="123"
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={newPaymentMethod.phoneNumber}
              onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, phoneNumber: e.target.value })}
              placeholder="+254 722 123 456"
              helperText="Enter your M-Pesa registered phone number"
            />
          )}

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">Your payment information is securely stored and encrypted.</Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddPaymentMethodDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddPaymentMethod}>
            Add Payment Method
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default WalletPage
