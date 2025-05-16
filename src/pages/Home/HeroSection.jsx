import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/images/banner.png';
import { LocalAtm, Groups } from '@mui/icons-material';

// Styled components
const CategoryItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#f0f7ff',
    cursor: 'pointer',
  },
  padding: '12px 16px',
  borderBottom: '1px solid #f0f0f0',
  backgroundColor: active ? '#f0f7ff' : 'transparent',
}));

// Banner overlay for text
const BannerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1,
}));

const HeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const categories = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and tech',
    'Tools, equipments',
    'Sports and outdoor',
    'Animal and pets',
    'Machinery tools',
    'More category'
  ];

  const [activeCategory, setActiveCategory] = useState('Automobiles');

  return (
    <Box px={{ xs: 2, md: 15 }} py={2} mt={2}>
      <Paper elevation={1} sx={{ overflow: 'hidden', borderRadius: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
          }}
        >
          {/* Categories */}
        

          {/* Cashback Banner */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: { md: '1px solid #f0f0f0' },
              borderBottom: { xs: '1px solid #f0f0f0', md: 'none' },
              position: 'relative',
            }}
          >
            <img
              src={banner || "/placeholder.svg"}
              alt="Cashback Offer"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
            <BannerOverlay>
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 1,
                }}
              >
                Earn 5% Cashback
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  mb: 2,
                }}
              >
                On all purchases. Shop now and save!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<LocalAtm />}
                onClick={() => navigate('/products')}
                sx={{
                  maxWidth: '150px',
                }}
              >
                Shop & Earn
              </Button>
            </BannerOverlay>
          </Box>

          {/* Bulk Pricing Banner */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: { md: '1px solid #f0f0f0' },
              borderBottom: { xs: '1px solid #f0f0f0', md: 'none' },
              position: 'relative',
            }}
          >
            <img
              src={banner || "/placeholder.svg"}
              alt="Bulk Pricing"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
            <BannerOverlay>
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 1,
                }}
              >
                Save 30% on Bulk Orders
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  mb: 2,
                }}
              >
                Special discounts on orders of 10+ items.
              </Typography>
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<Groups />}
                onClick={() => navigate('/bulk-pricing')}
                sx={{
                  maxWidth: '150px',
                }}
              >
                View Bulk Deals
              </Button>
            </BannerOverlay>
          </Box>

          {/* User Actions */}
       
        </Box>
      </Paper>
    </Box>
  );
};

export default HeroSection;