import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Badge,
  Container,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  ExpandMore as ChevronDownIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FirstCraftLogo from '../assets/images/FirstCraft-logo.png';

// Styled Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey[500],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textTransform: 'none',
  padding: '4px 8px',
  fontSize: '12px',
  minWidth: 'unset',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
  },
}));

const NavigationBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSubmenus, setDrawerSubmenus] = useState({});

  const menus = {
    'Office Essentials': ['Paper Products', 'Writing Instruments', 'Binders & Filing'],
    'Toners & Inks': ['HP Toners', 'Canon Inks', 'Brother Cartridges'],
    'Office Machines': ['Printers', 'Shredders', 'Laminators'],
  };

  const handleMenuOpen = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu('');
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const toggleSubmenu = (key) => {
    setDrawerSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: 0,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Typography variant="h6" noWrap sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={FirstCraftLogo}
                  alt="FirstCraft Logo"
                  sx={{
                    height: { xs: '30px', sm: '40px' },
                    marginRight: '8px',
                  }}
                />
              </Typography>
            </Box>

            {/* Right Side */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                px: 1,
                borderRadius: 1,
              }}
            >
              {!isMobile && (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
                </Search>
              )}
              <IconButton sx={{ color: theme.palette.primary.contrastText }} onClick={() => navigate('/wishlist')}>
                <FavoriteIcon />
              </IconButton>
              <IconButton sx={{ color: theme.palette.primary.contrastText }} onClick={() => navigate('/account')}>
                <PersonIcon />
              </IconButton>
              <IconButton sx={{ color: theme.palette.primary.contrastText }} onClick={() => navigate('/cart')}>
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {isMobile && (
                <IconButton sx={{ color: theme.palette.primary.contrastText }} onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>

        {/* Bottom Toolbar */}
        {!isMobile && (
          <Box sx={{ bgcolor: theme.palette.primary.main, width: '100%', color: theme.palette.primary.contrastText }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters sx={{ minHeight: '40px', overflowX: 'auto' }}>
                <NavButton>Special Offer</NavButton>
                {Object.keys(menus).map((menuName) => (
                  <Box key={menuName} onMouseLeave={handleMenuClose}>
                    <NavButton
                      onMouseEnter={(e) => handleMenuOpen(e, menuName)}
                      endIcon={<ChevronDownIcon fontSize="small" />}
                    >
                      {menuName}
                    </NavButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu === menuName}
                      onClose={handleMenuClose}
                      MenuListProps={{
                        onMouseEnter: () => {},
                        onMouseLeave: handleMenuClose,
                      }}
                    >
                      {menus[menuName].map((item, index) => (
                        <MenuItem key={index} onClick={handleMenuClose}>
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ))}
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
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 260 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Special Offer" />
              </ListItemButton>
            </ListItem>

            {Object.keys(menus).map((menuName) => (
              <React.Fragment key={menuName}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => toggleSubmenu(menuName)}>
                    <ListItemText primary={menuName} />
                    {drawerSubmenus[menuName] ? <ExpandLess /> : <ChevronRightIcon />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={drawerSubmenus[menuName]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menus[menuName].map((subItem, index) => (
                      <ListItemButton key={index} sx={{ pl: 4 }}>
                        <ListItemText primary={subItem} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}

            {[
              'School Supplies',
              'Stapling & Punching',
              'IT Accessories',
              'Office Furniture',
              'More',
              'ALL Brands',
              'Contact Us',
            ].map((item, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavigationBar;
