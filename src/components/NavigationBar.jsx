import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase, 
  Box, 
  IconButton,
  Badge,
  Container,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FirstCraftLogo from '../assets/images/FirstCraft-logo.png';


// Navigation link button
const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  }
}));

// Main NavBar component
const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ boxShadow: 0 }}>
      {/* Top Toolbar - Logo and actions */}
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
      
              <img 
                src={FirstCraftLogo}
                alt="FirstCraft Logo" 
                height="40"
                style={{ marginRight: '8px' }}
              />

          </Box>

          {/* Right actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            {/* Icons */}
            <IconButton color="inherit" size="large" onClick={() => navigate('/wishlist')}>
              <FavoriteIcon />
            </IconButton>
            <IconButton color="inherit" size="large" onClick={() => navigate('/account')}>
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit" size="large" onClick={() => navigate('/cart')}>
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Bottom Toolbar - Navigation Links */}
      <Box sx={{ bgcolor: '#005DB3', width: '100%' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: '48px', overflowX: 'auto' }}>
            <NavButton>Special Offer</NavButton>
            <NavButton>Office Essentials</NavButton>
            <NavButton>Toners & Inks</NavButton>
            <NavButton>Office Machines</NavButton>
            <NavButton>School Supplies</NavButton>
            <NavButton>Stapling & Punching</NavButton>
            <NavButton>IT Accessories</NavButton>
            <NavButton>Office Furniture</NavButton>
            <NavButton>More</NavButton>
            <NavButton>ALL Brands</NavButton>
            <NavButton>Contact Us</NavButton>
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
};

export default NavigationBar;