import React from 'react';
import {
    Box,
    Card,
    Typography,
    CardMedia
} from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

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
            borderRadius: 1,
            p: 2,
            position: 'relative',
            '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }
        }}
    >
        {/* Cashback Badge */}
        {/* <Box
            sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: 'success.light',
                color: 'success.dark',
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                fontSize: 12,
                fontWeight: 500
            }}
        >
            {category.cashback}% Cashback
        </Box> */}
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
                fontSize: 18,
                fontWeight: 700,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                zIndex: 1
            }}
        >
            {category.cashback}% Cashback
        </Typography>

        {/* Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 6, mb: 2 }}>
            <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
                sx={{ width: 120, height: 120, objectFit: 'contain' }}
            />
        </Box>

        {/* Item code (fake for now) */}
        <Typography variant="body2" color="text.secondary" fontWeight="bold">
            Item code: XXXXX
        </Typography>

        {/* Item description */}
        <Typography variant="body1" sx={{ fontWeight: 500, my: 1 }}>
            {category.name} - This is a sample product description.
        </Typography>

        {/* Tiered Pricing Boxes */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            {[ 
                { label: '1 - 3 Pc', price: category.price },
                { label: '4 - 11 Pc', price: category.price * 1.05 }, // example tier
                { label: '12Pc +', price: category.price * 0.95 } // example tier
            ].map((tier, idx) => (
                <Box
                    key={idx}
                    sx={{
                        flex: 1,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        p: 1,
                        textAlign: 'center',
                        fontSize: 12
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>{tier.label}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>{tier.price.toLocaleString()} /= </Typography>
                </Box>
            ))}
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
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 6,
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
