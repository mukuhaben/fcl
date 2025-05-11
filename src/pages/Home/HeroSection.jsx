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
        

          {/* Banner */}
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: { md: '1px solid #f0f0f0' },
              borderBottom: { xs: '1px solid #f0f0f0', md: 'none' },
            }}
          >
            <img
              src={banner}
              alt="Banner"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: { md: '1px solid #f0f0f0' },
              borderBottom: { xs: '1px solid #f0f0f0', md: 'none' },
            }}
          >
            <img
              src={banner}
              alt="Banner"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* User Actions */}
       
        </Box>
      </Paper>
    </Box>
  );
};

export default HeroSection;
