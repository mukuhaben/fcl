import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  FormControlLabel,
  Checkbox,
  Rating,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
  TextField,
  Slider,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Radio,
  RadioGroup
} from '@mui/material';
import { 
  ExpandMore, 
  FavoriteBorder, 
  Favorite, 
  GridView, 
  ViewList, 
  NavigateNext 
} from '@mui/icons-material';
import softChairsImage from '../../assets/images/1.png';
import sofaChairImage from '../../assets/images/2.png';
import kitchenDishesImage from '../../assets/images/11.png';
import smartWatchesImage from '../../assets/images/8.png';
import kitchenMixerImage from '../../assets/images/9.png';
import blendersImage from '../../assets/images/12.png';
import homeApplianceImage from '../../assets/images/10.png';
import coffeeMakerImage from '../../assets/images/13.png';

export default function EcommerceProductListing() {
  // State for filters and UI controls
  const [view, setView] = useState('grid');
  const [expanded, setExpanded] = useState({
    category: true,
    brands: true,
    features: true,
    priceRange: true,
    condition: true,
    ratings: true,
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCondition, setSelectedCondition] = useState('any');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Canon Camera EOS 200D, Black 10x zoom',
      ranges:[
        { range: '1', label: '1', cashback: 5,price: 998.00, },
        { range: '1-6',label: '1-6', cashback: 10, price: 998.00, },
        { range: '1-12', label: '1-12', cashback: 15, price: 998.00, },
      ],
      price: 998.00,
      originalPrice: 1296.00,
      rating: 4.5,
      orders: 154,
      image: softChairsImage,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
    {
      id: 2,
      name: 'GoPro HERO6 4K Action Camera - Black',
      ranges:[
        { range: '1', label: '1', cashback: 5,price: 998.00, },
        { range: '1-6',label: '1-6', cashback: 10, price: 998.00, },
        { range: '1-12', label: '1-12', cashback: 15, price: 998.00, },
      ],
      price: 998.00,
      rating: 4.5,
      orders: 154,
      image: sofaChairImage,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
    {
      id: 3,
      name: 'GoPro HERO6 4K Action Camera - Black',
      ranges:[
        { range: '1', label: '1', cashback: 5,price: 998.00, },
        { range: '1-6',label: '1-6', cashback: 10, price: 998.00, },
        { range: '1-12', label: '1-12', cashback: 15, price: 998.00, },
      ],
      price: 998.00,
      rating: 4.5,
      orders: 154,
      image: kitchenDishesImage,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
    {
      id: 4,
      name: 'GoPro HERO6 4K Action Camera - Black',
      ranges:[
        { range: '1', label: '1', cashback: 5,price: 998.00, },
        { range: '1-6',label: '1-6', cashback: 10, price: 998.00, },
        { range: '1-12', label: '1-12', cashback: 15, price: 998.00, },
      ],
      price: 998.00,
      originalPrice: 1128.00,
      rating: 4.5,
      orders: 154,
      image: smartWatchesImage,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
    {
      id: 5,
      name: 'GoPro HERO6 4K Action Camera - Black',
      ranges:[
        { range: '1', label: '1', cashback: 5,price: 998.00, },
        { range: '1-6',label: '1-6', cashback: 10, price: 998.00, },
        { range: '1-12', label: '1-12', cashback: 15, price: 998.00, },
      ],
      price: 998.00,
      rating: 4.5,
      orders: 154,
      image: kitchenMixerImage,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
  ];

  // Handle accordion expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded({
      ...expanded,
      [panel]: isExpanded
    });
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceChange(newValue);
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  // Handle sort by change
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  // Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Handle condition change
  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  // Format price for display
  const formatPrice = (price) => {
    return `KSH${price.toFixed(2)}`;
  };

  return (
    <Box sx={{ p: 2}}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="#">Home</Link>
        <Link underline="hover" color="inherit" href="#">Clothings</Link>
        <Link underline="hover" color="inherit" href="#">Men's wear</Link>
        <Typography color="text.primary">Summer clothing</Typography>
      </Breadcrumbs>

        
      <Grid container spacing={2} flexDirection={{ xs: 'column', md: 'row' }}>
            {/* Filters Column */}
            <Grid item xs={4} md={2}>
            <Box sx={{ mb: 3 }}>
                <Accordion expanded={expanded.category} onChange={handleAccordionChange('category')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                    <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Mobile accessory</Typography>
                    <Typography sx={{ mb: 1 }}>Electronics</Typography>
                    <Typography sx={{ mb: 1 }}>Smartphones</Typography>
                    <Typography sx={{ mb: 1 }}>Modern tech</Typography>
                    <Link href="#" sx={{ color: 'primary.main', fontSize: '0.875rem', mt: 1 }}>See all</Link>
                    </Stack>
                </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded.brands} onChange={handleAccordionChange('brands')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Brands</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                    <Stack>
                        <FormControlLabel control={<Checkbox />} label="Samsung" />
                        <FormControlLabel control={<Checkbox />} label="Apple" />
                        <FormControlLabel control={<Checkbox />} label="Huawei" />
                        <FormControlLabel control={<Checkbox />} label="Pocco" />
                        <FormControlLabel control={<Checkbox />} label="Lenovo" />
                        <Link href="#" sx={{ color: 'primary.main', fontSize: '0.875rem', mt: 1 }}>See all</Link>
                    </Stack>
                    </FormControl>
                </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded.features} onChange={handleAccordionChange('features')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                    <Stack>
                        <FormControlLabel control={<Checkbox />} label="Metallic" />
                        <FormControlLabel control={<Checkbox />} label="Plastic cover" />
                        <FormControlLabel control={<Checkbox />} label="8GB Ram" />
                        <FormControlLabel control={<Checkbox />} label="Super power" />
                        <FormControlLabel control={<Checkbox />} label="Large Memory" />
                        <Link href="#" sx={{ color: 'primary.main', fontSize: '0.875rem', mt: 1 }}>See all</Link>
                    </Stack>
                    </FormControl>
                </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded.priceRange} onChange={handleAccordionChange('priceRange')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Price range</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ px: 1 }}>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={2000}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <TextField
                        label="Min"
                        size="small"
                        value={priceRange[0]}
                        sx={{ width: '45%' }}
                        />
                        <TextField
                        label="Max"
                        size="small"
                        value={priceRange[1]}
                        sx={{ width: '45%' }}
                        />
                    </Box>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Apply
                    </Button>
                    </Box>
                </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded.condition} onChange={handleAccordionChange('condition')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Condition</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup
                    value={selectedCondition}
                    onChange={handleConditionChange}
                    >
                    <FormControlLabel value="any" control={<Radio />} label="Any" />
                    <FormControlLabel value="refurbished" control={<Radio />} label="Refurbished" />
                    <FormControlLabel value="brandNew" control={<Radio />} label="Brand new" />
                    <FormControlLabel value="old" control={<Radio />} label="Old items" />
                    </RadioGroup>
                </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded.ratings} onChange={handleAccordionChange('ratings')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Ratings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                    <Stack>
                        <FormControlLabel 
                        control={<Checkbox />} 
                        label={<Rating value={5} readOnly size="small" />} 
                        />
                        <FormControlLabel 
                        control={<Checkbox />} 
                        label={<Rating value={4} readOnly size="small" />} 
                        />
                        <FormControlLabel 
                        control={<Checkbox />} 
                        label={<Rating value={3} readOnly size="small" />} 
                        />
                        <FormControlLabel 
                        control={<Checkbox />} 
                        label={<Rating value={2} readOnly size="small" />} 
                        />
                    </Stack>
                    </FormControl>
                </AccordionDetails>
                </Accordion>
            </Box>
            </Grid>

            {/* Products Column */}
            <Grid item xs={6} md={5}>
                <Box maxWidth="lg" sx={{ mx: 'auto' }}>
            <Paper sx={{ mb: 2, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2">
                    <strong>12,911</strong> items in <strong>Mobile accessory</strong>
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel control={<Checkbox />} label="Verified only" sx={{ mr: 1 }} />
                    
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120, mr: 2 }}>
                    <Select
                        value={sortBy}
                        onChange={handleSortByChange}
                        displayEmpty
                    >
                        <MenuItem value="featured">Featured</MenuItem>
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                    </Select>
                    </FormControl>
                    
                    <IconButton 
                    onClick={() => handleViewChange('grid')} 
                    color={view === 'grid' ? 'primary' : 'default'}
                    >
                    <GridView />
                    </IconButton>
                    <IconButton 
                    onClick={() => handleViewChange('list')} 
                    color={view === 'list' ? 'primary' : 'default'}
                    >
                    <ViewList />
                    </IconButton>
                </Box>
                </Box>
            </Paper>

            {/* Products Grid/List View */}
            <Box sx={{ mb: 3 }}>
                {view === 'grid' ? (
                <Grid container spacing={2}>
                    {products.map((product) => (
                    <Grid item xs={12} key={product.id}>
                        <Card sx={{ display: 'flex', height: '100%' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200, objectFit: 'contain', p: 2 }}
                            image={product.image}
                            alt={product.name}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography component="div" variant="h6">
                                {product.name}
                                </Typography>
                                <IconButton aria-label="add to favorites">
                                <FavoriteBorder />
                                </IconButton>
                            </Box>
                            
                            {product.ranges && product.ranges.map((range, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                    Pieces: {range.label}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mr: 1 }}>
                                    {formatPrice(range.price)}
                                </Typography>
                                <Typography variant="body2" color="green" sx={{ mr: 1 }}>
                                    Cashback: {range.cashback}%
                                </Typography>
                                </Box>
                            ))}
                            {(!product.ranges || product.ranges.length === 0) && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mr: 1 }}>
                                    {formatPrice(product.price)}
                                </Typography>
                                {product.originalPrice && (
                                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                    {formatPrice(product.originalPrice)}
                                    </Typography>
                                )}
                                </Box>
                            )}
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating value={product.rating} precision={0.5} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {product.rating} • {product.orders} orders
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small" color="primary">
                                View details
                            </Button>
                            <Chip label="Free Shipping" color="success" size="small" sx={{ ml: 'auto' }} />
                            </CardActions>
                        </Box>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                ) : (
                <Grid container spacing={2}>
                    {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={product.image}
                            alt={product.name}
                            sx={{ objectFit: 'contain', p: 2 }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="div">
                            {product.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mr: 1 }}>
                                {formatPrice(product.price)}
                            </Typography>
                            {product.originalPrice && (
                                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                {formatPrice(product.originalPrice)}
                                </Typography>
                            )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={product.rating} precision={0.5} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {product.rating}
                            </Typography>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                            View details
                            </Button>
                            <IconButton aria-label="add to favorites" sx={{ ml: 'auto' }}>
                            <FavoriteBorder />
                            </IconButton>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                )}
            </Box>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                    Show:
                </Typography>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                    <Select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <Pagination 
                count={5} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                shape="rounded" 
                />
            </Box>

            </Box>
            </Grid>
        </Grid>
    </Box>
  );
}