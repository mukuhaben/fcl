"use client"

import { useState } from "react"
import { Button, TextField, Typography, Paper, Container, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // Mock login - in a real app, you would call an API
    if (email === "user@example.com" && password === "password") {
      // Create mock user data
      const userData = {
        username: "John Doe",
        email: email,
        id: "12345",
      }

      // Store in localStorage
      localStorage.setItem("currentUser", JSON.stringify(userData))

      // Call the onLogin callback if provided
      if (onLogin) {
        onLogin(userData)
      }

      // Navigate to home page
      navigate("/")
    } else {
      setError("Invalid email or password")
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

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            For demo purposes, use: user@example.com / password
          </Typography>

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2, py: 1.5 }}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
