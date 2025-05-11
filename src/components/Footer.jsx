import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FirstCraftLogo from '../assets/images/FirstCraft-Logo.png'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

// App store badges
const AppStoreBadge = () => (
  <Box
    component="img"
    alt="Download on the App Store"
    src="/path-to-appstore-badge.png"
    sx={{ height: 40, mb: 1 }}
  />
);

const GooglePlayBadge = () => (
  <Box
    component="img"
    alt="Get it on Google Play"
    src="/path-to-googleplay-badge.png"
    sx={{ height: 40 }}
  />
);

// Create footer link component for reuse
const FooterLink = ({ text }) => (
  <Link 
    href="#" 
    underline="hover" 
    color="inherit" 
    sx={{ 
      display: 'block', 
      mb: 1.5, 
      fontSize: '0.875rem',
      color: 'text.secondary',
      '&:hover': {
        color: 'primary.main'
      }
    }}
  >
    {text}
  </Link>
);

// Logo component
const Logo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} onClick={() => navigate('/')}>
    <Box
      component="img"
      src={FirstCraftLogo}
      alt="First Craft logo"
      sx={{ 
        // width: 60, 
        // height: 60,
        // borderRadius: '50%',
      }}
    />
   
  </Box>
);

// Footer component
export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 6, pb: 3, px:4 }}>
      
        <Grid container justifyContent={'space-between'}>
          {/* Logo and company info */}
          <Grid item xs={12} md={3}>
            <Logo />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Best information about the company goes here but now lorem ipsum is
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <IconButton size="small" aria-label="Facebook" sx={{ bgcolor: 'grey.200' }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="Twitter" sx={{ bgcolor: 'grey.200' }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="LinkedIn" sx={{ bgcolor: 'grey.200' }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="Instagram" sx={{ bgcolor: 'grey.200' }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="YouTube" sx={{ bgcolor: 'grey.200' }}>
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* About section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>About</Typography>
            <FooterLink text="About Us" />
            <FooterLink text="Find store" />
            <FooterLink text="Categories" />
            <FooterLink text="Blogs" />
          </Grid>

          {/* Partnership section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Partnership</Typography>
            <FooterLink text="About Us" />
            <FooterLink text="Find store" />
            <FooterLink text="Categories" />
            <FooterLink text="Blogs" />
          </Grid>

          {/* Information section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Information</Typography>
            <FooterLink text="Help Center" />
            <FooterLink text="Money Refund" />
            <FooterLink text="Shipping" />
            <FooterLink text="Contact us" />
          </Grid>

          {/* For users section */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>For users</Typography>
            <FooterLink text="Login" />
            <FooterLink text="Register" />
            <FooterLink text="Settings" />
            <FooterLink text="My Orders" />
          </Grid>

          {/* Get app section */}
          {/* <Grid item xs={12} sm={6} md={isMobile ? 6 : 1}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Get app</Typography>
            <Stack direction={isMobile ? "row" : "column"} spacing={1} sx={{ flexWrap: 'wrap' }}>
              <AppStoreBadge />
              <GooglePlayBadge />
            </Stack>
          </Grid> */}
        </Grid>

        {/* Bottom footer */}
        <Box 
          sx={{ 
            mt: 5, 
            pt: 2, 
            borderTop: '1px solid', 
            borderColor: 'grey.200',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © 2025 First Craft.
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: isMobile ? 2 : 0 }}>
            {/* <Box component="img" src="/path-to-us-flag.png" alt="US flag" sx={{ width: 20, height: 14, mr: 0.5 }} /> */}
            <Typography variant="caption" color="text.secondary">English</Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          </Box>
        </Box>
     
    </Box>
  );
}