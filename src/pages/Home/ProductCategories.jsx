import React from 'react';
import {
    Box,
    Card,
    Typography,
    CardMedia,
    IconButton
} from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import 'swiper/css';
import 'swiper/css/navigation';
import Tooltip from '@mui/material/Tooltip';

import softChairsImage from '../../assets/images/1.png';
import sofaChairImage from '../../assets/images/2.png';
import kitchenDishesImage from '../../assets/images/11.png';
import smartWatchesImage from '../../assets/images/8.png';
import kitchenMixerImage from '../../assets/images/9.png';
import blendersImage from '../../assets/images/12.png';
import homeApplianceImage from '../../assets/images/10.png';
import coffeeMakerImage from '../../assets/images/13.png';

const categories = [
    { id: 1, name: 'Soft chairs', price: 1900000, cashback: 5, image: softChairsImage },
    { id: 2, name: 'Sofa & chair', price: 1900000, cashback: 3, image: sofaChairImage },
    { id: 3, name: 'Kitchen dishes', price: 1900000, cashback: 7, image: kitchenDishesImage },
    { id: 4, name: 'Smart watches', price: 1900000, cashback: 10, image: smartWatchesImage },
    { id: 5, name: 'Kitchen mixer', price: 10000000, cashback: 15, image: kitchenMixerImage },
    { id: 6, name: 'Blenders', price: 3900000, cashback: 8, image: blendersImage },
    { id: 7, name: 'Home appliance', price: 1900000, cashback: 6, image: homeApplianceImage },
    { id: 8, name: 'Coffee maker', price: 1000000, cashback: 12, image: coffeeMakerImage }
];

const CategoryCard = ({ category }) => (
    <Card
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'none',
            border: '1px solid #f0f0f0',
            borderRadius: 2,
            p: 2,
            position: 'relative',
            minHeight: 320,
            '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }
        }}
    >
        {/* Cashback Badge */}
        <Typography
            variant="body2"
            color="white"
            fontWeight="bold"
            sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: 'red',
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                fontSize: 12, // Reduced from 14
                fontWeight: 700,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                zIndex: 1
            }}
        >
            {category.cashback}% Cashback
        </Typography>

        {/* Image - Fixed consistent height */}
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 150,
                mt: 4,
                mb: 1,
            }}
        >
            <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
                sx={{ 
                    maxWidth: 130,
                    maxHeight: 130,
                    objectFit: 'contain',
                    margin: 'auto'
                }}
            />
        </Box>

        {/* Item code - Smaller font */}
        <Typography 
            variant="body2" 
            color="text.secondary" 
            fontWeight="bold"
            sx={{ fontSize: '0.65rem' }} // Smaller font
        >
            Item code: XXXXX
        </Typography>

        {/* Item description - Smaller font */}
        <Typography 
            variant="body2"
            sx={{ 
                fontWeight: 500, 
                my: 1,
                fontSize: '0.75rem', // Smaller font
                lineHeight: 1.3
            }}
        >
            {category.name} - This is a sample product description.
        </Typography>

        {/* Pricing section - Cleaner layout with smaller fonts */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 'auto',
                mb: 3, // Space for cart icon
                position: 'relative'
            }}
        >
            {/* Simple table-like layout for pricing */}
            <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: '4px' }}>
                <Box sx={{ display: 'table-row' }}>
                    {[
                        { label: '1-3 Pc', price: category.price },
                        { label: '4-11 Pc', price: category.price * 1.05 },
                        { label: '12+ Pc', price: category.price * 0.95 }
                    ].map((tier, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                display: 'table-cell',
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                p: 0.5,
                                textAlign: 'center',
                                verticalAlign: 'middle'
                            }}
                        >
                            <Typography 
                                sx={{ 
                                    fontSize: '0.6rem',
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {tier.label}
                            </Typography>
                            <Typography 
                                sx={{ 
                                    fontSize: '0.6rem',
                                    lineHeight: 1.2,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {(tier.price / 1000000).toFixed(1)}M
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            
            {/* Cart icon */}
            <Tooltip title="Add to cart">
                <IconButton 
                    size="small"
                    sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: -15,
                        backgroundColor: '#f0f7ff',
                        border: '1px solid #e0e0e0',
                        width: 28,
                        height: 28,
                        '&:hover': {
                            backgroundColor: '#e6f0ff'
                        }
                    }}
                >
                    <ShoppingCartIcon 
                        sx={{
                            color: 'blue',
                            fontSize: '1rem'
                        }} 
                    />
                </IconButton>
            </Tooltip>
        </Box>
    </Card>
);

const ProductCategories = ({ header }) => {
    return (
        <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 2 }}>
            <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ mb: 2, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
            >
                {header}
            </Typography>
            <Swiper
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation
                modules={[Autoplay, Navigation]}
                style={{ padding: '10px 0' }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    900: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 5, // Display 5 cards as requested
                    }
                }}
            >
                {categories.map(category => (
                    <SwiperSlide key={category.id}>
                        <CategoryCard category={category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default ProductCategories;