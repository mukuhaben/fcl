"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  Paper,
  Grid,
  InputAdornment,
  FormLabel,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const RegistrationForm = () => {
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    registrationType: "self", // 'self' or 'agent'
    salesAgent: "Vijay Kumar",
    companyName: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    cashbackPhone: "",
    kraPin: "",
    buildingName: "",
    floorNumber: "",
    roomNumber: "",
    streetName: "",
    areaName: "Westlands (KE)",
    city: "",
    country: "Kenya",
    userType: "Company", // 'Company' or 'Individual'
  })

  // Errors state
  const [errors, setErrors] = useState({})

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    const newErrors = {}
    if (!formData.companyName) newErrors.companyName = "Company/Individual name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit form data
    console.log("Form submitted:", formData)
    alert("Registration successful!")
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
          Create New Customer
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Registration Type Section */}
          <Box mb={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Registration Type</FormLabel>
              <RadioGroup row name="registrationType" value={formData.registrationType} onChange={handleChange}>
                <FormControlLabel value="self" control={<Radio />} label="Self Registration" />
                <FormControlLabel value="agent" control={<Radio />} label="Registered by Sales Agent" />
              </RadioGroup>
            </FormControl>

            {formData.registrationType === "agent" && (
              <FormControl fullWidth margin="normal" size="small">
                <Typography variant="body2" gutterBottom>
                  Sales Agent
                </Typography>
                <Select name="salesAgent" value={formData.salesAgent} onChange={handleChange}>
                  <MenuItem value="Vijay Kumar">Vijay Kumar</MenuItem>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
          
           {/* User Type */}
          <Box mb={3}>
            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Type of User
            </Typography>
            <FormControl fullWidth margin="normal" size="small">
              <RadioGroup row name="userType" value={formData.userType} onChange={handleChange}>
                <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="Company" control={<Radio />} label="Company" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Account Information */}
          <Box mb={3}>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Company/Individual Name{" "}
              <Typography component="span" color="error" variant="body2">
                (Please note: Your invoice will be generated in this name)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company/Individual Name"
              size="small"
              error={!!errors.companyName}
              helperText={errors.companyName}
              margin="normal"
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Contact Person Name
            </Typography>
            <TextField
              fullWidth
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person Name"
              size="small"
              margin="normal"
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              size="small"
              type="email"
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="XXXXXXXXX"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 0 }}>
                    +254
                  </InputAdornment>
                ),
              }}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              margin="normal"
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Cashback Phone Number{" "}
              <Typography component="span" color="error" variant="body2">
                (SAFARICOM MOBILE NUMBER ONLY)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              name="cashbackPhone"
              value={formData.cashbackPhone}
              onChange={handleChange}
              placeholder="XXXXXXXXX"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 0 }}>
                    +254
                  </InputAdornment>
                ),
              }}
              margin="normal"
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Company/Individual KRA Pin{" "}
              <Typography component="span" color="error" variant="body2">
                (Fill this field to claim VAT)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              name="kraPin"
              value={formData.kraPin}
              onChange={handleChange}
              placeholder="KRA pin"
              size="small"
              margin="normal"
            />
          </Box>

          {/* Address Information */}
          <Box mb={3}>
            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Building Name
            </Typography>
            <TextField
              fullWidth
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
              placeholder="Building name"
              size="small"
              margin="normal"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                  Floor Number
                </Typography>
                <TextField
                  fullWidth
                  name="floorNumber"
                  value={formData.floorNumber}
                  onChange={handleChange}
                  placeholder="Floor Number"
                  size="small"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                  Room/Door Number
                </Typography>
                <TextField
                  fullWidth
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  placeholder="Room/Door Number"
                  size="small"
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Street Name
            </Typography>
            <TextField
              fullWidth
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              placeholder="Street 1"
              size="small"
              margin="normal"
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Area Name
            </Typography>
            <FormControl fullWidth margin="normal" size="small">
              <Select name="areaName" value={formData.areaName} onChange={handleChange}>
                <MenuItem value="Westlands (KE)">Westlands (KE)</MenuItem>
                <MenuItem value="Nairobi CBD">Parklands</MenuItem>
                <MenuItem value="Kilimani">...</MenuItem>
                <MenuItem value="Lavington">...</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              City
            </Typography>
            <TextField
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              size="small"
              margin="normal"
            />

            <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Country
            </Typography>
            <TextField
              fullWidth
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Kenya"
              size="small"
              margin="normal"
              disabled
            />
          </Box>

         

          {/* Form Actions */}
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ px: 4, py: 1 }}>
              Create Customer
            </Button>
            <Button type="button" variant="outlined" onClick={() => navigate(-1)} sx={{ px: 4, py: 1 }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default RegistrationForm
