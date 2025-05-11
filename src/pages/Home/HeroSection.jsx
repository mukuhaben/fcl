import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Box, 
  Paper,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import banner from '../../assets/images/banner.png'; // Adjust the path as necessary

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

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  padding: '8px',
  width: '100%',
}));

const HeroSection = () => {
    const navigate = useNavigate();
  // Category list data
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
    <Box paddingX={10} paddingY={2} mt={2}>
      <Paper elevation={1} sx={{ overflow: 'hidden', borderRadius: 1 }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'row',
          width: '100%'
        }}>
          {/* Categories Column */}
          <Box sx={{ 
            width: '25%', 
            bgcolor: 'white', 
            borderRight: '1px solid #f0f0f0'
          }}>
            <List disablePadding>
              {categories.map((category, index) => (
                <CategoryItem 
                  key={index} 
                  active={category === activeCategory}
                  onClick={() => {
                    setActiveCategory(category)
                    navigate('/product-details')
                }}
                  sx={{ 
                    py: 1.5,
                    color: category === activeCategory ? '#1976d2' : 'inherit'
                  }}
                >
                  <ListItemText 
                    primary={category} 
                    primaryTypographyProps={{ 
                      sx: { 
                        color: category === activeCategory ? '#1976d2' : 'text.primary',
                        fontSize: '0.875rem'
                      } 
                    }}
                  />
                </CategoryItem>
              ))}
            </List>
          </Box>

          {/* Banner Column */}
          <Box sx={{ 
            width: '70%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRight: '1px solid #f0f0f0',
          }}>
            <img
              src={banner} 
              alt="Banner" 
              style={{ 
                width: '100%', 
                height: 'auto',
                maxHeight: '700px',
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* User Actions Column */}
          <Box sx={{ 
            width: '25%', 
            bgcolor: 'white',
            p: 2
          }}>
            {/* Welcome Section */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3
            }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 1,
                bgcolor: '#f0f2f5',
                borderRadius: '50%',
                color: '#6c757d'
              }}>
                👤
              </Box>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ mb: 0.5, fontWeight: 500 }}
              >
                Hi, user
              </Typography>
              <Typography 
                variant="body2" 
                align="center" 
                color="text.secondary" 
                sx={{ mb: 2 }}
              >
                let's get stated
              </Typography>
              <Button 
                fullWidth
                variant="contained" 
                sx={{ 
                  mb: 1, 
                  bgcolor: '#0d6efd', 
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  borderRadius: 1,
                  py: 1
                }}
              >
                Join now
              </Button>
              <Button 
                fullWidth
                variant="outlined" 
                sx={{ 
                  color: '#0d6efd', 
                  borderColor: '#0d6efd',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  borderRadius: 1,
                  py: 1
                }}
              >
                Log in
              </Button>
            </Box>

            {/* Promotions */}
            <Box sx={{ 
              bgcolor: '#f77f14', 
              color: 'white', 
              p: 2, 
              borderRadius: 1, 
              mb: 2 
            }}>
              <Typography variant="body1" fontWeight="bold">
                Get US KSH 10 off
              </Typography>
              <Typography variant="body2">
                with a new supplier
              </Typography>
            </Box>

            <Box sx={{ 
              bgcolor: '#17a2b8', 
              color: 'white', 
              p: 2, 
              borderRadius: 1 
            }}>
              <Typography variant="body1" fontWeight="bold">
                Send quotes with
              </Typography>
              <Typography variant="body2">
                supplier preferences
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default HeroSection;