import { useState } from "react"
import { Button, TextField, Typography, Paper, Container, Alert, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // For demo purposes, allow any email with password "0000"
    if (password === "0000") {
      // Create mock user data
      const userData = {
        username: email.split("@")[0], // Use part before @ as username
        email: email,
        id: "12345",
      }

      // Show success message
      setSuccessMessage("Login successful! Redirecting to your account...")

      // Store in localStorage
      localStorage.setItem("currentUser", JSON.stringify(userData))

      // Call the onLogin callback if provided
      if (onLogin) {
        onLogin(userData)
      }

      // Navigate to account page after a short delay
      setTimeout(() => {
        navigate("/account")
      }, 1500)
    } else {
      setError("Invalid password. For demo, use '0000' as the password.")
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Box sx={{ mt: 2, mb: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Demo Instructions:</strong> Enter any email address and use password "0000" to sign in.
            </Typography>
          </Box>

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2, py: 1.5 }}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
