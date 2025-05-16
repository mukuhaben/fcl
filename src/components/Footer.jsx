import React from 'react';
import { 
  Box, 
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
import FirstCraftLogo from '../assets/images/FirstCraft-Logo.png';
import { useNavigate } from 'react-router-dom';

const AppStoreBadge = () => (
  <Box component="img" alt="App Store" src="/path-to-appstore-badge.png" sx={{ height: 40, mb: 1 }} />
);

const GooglePlayBadge = () => (
  <Box component="img" alt="Google Play" src="/path-to-googleplay-badge.png" sx={{ height: 40 }} />
);

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

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 6, pb: 3, px: 2 }}>
      <Grid container spacing={4}>
        {/* Logo and company info */}
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Box component="img" src={FirstCraftLogo} alt="First Craft logo" sx={{ height: 150 }} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Best information about the company goes here but now lorem ipsum is
          </Typography>
          <Stack direction="row" spacing={1} justifyContent={isMobile ? "center" : "flex-start"} sx={{ mb: 2 }}>
            {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon, YouTubeIcon].map((Icon, index) => (
              <IconButton key={index} size="small" sx={{ bgcolor: 'grey.200' }}>
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Stack>
        </Grid>

        {/* Link Sections */}
        {[
          { title: 'About', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
          { title: 'Partnership', links: ['About Us', 'Find store', 'Categories', 'Blogs'] },
          { title: 'Information', links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'] },
          { title: 'For users', links: ['Login', 'Register', 'Settings', 'My Orders'] }
        ].map((section, index) => (
          <Grid item xs={6} sm={3} md={2} key={index}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>{section.title}</Typography>
            {section.links.map((link, idx) => (
              <FooterLink key={idx} text={link} />
            ))}
          </Grid>
        ))}

        {/* Uncomment to show App store badges */}
        {/* <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Get app</Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <AppStoreBadge />
            <GooglePlayBadge />
          </Stack>
        </Grid> */}
      </Grid>

      {/* Bottom section */}
      <Box 
        sx={{ 
          mt: 5, 
          pt: 2, 
          borderTop: '1px solid', 
          borderColor: 'grey.200',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2025 First Craft.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">English</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </Box>
      </Box>
    </Box>
  );
}
