import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, Container } from '@mui/material';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                // value={name}
                // onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            // value={number}
            // onChange={(e) => setEmail(e.target.value)}
            required
            />

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
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
