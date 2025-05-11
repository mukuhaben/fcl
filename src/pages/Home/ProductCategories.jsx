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
    { id: 1, name: 'Soft chairs', price: 19, cashback: 5, image: softChairsImage },
    { id: 2, name: 'Sofa & chair', price: 19, cashback: 3, image: sofaChairImage },
    { id: 3, name: 'Kitchen dishes', price: 19, cashback: 7, image: kitchenDishesImage },
    { id: 4, name: 'Smart watches', price: 19, cashback: 10, image: smartWatchesImage },
    { id: 5, name: 'Kitchen mixer', price: 100, cashback: 15, image: kitchenMixerImage },
    { id: 6, name: 'Blenders', price: 39, cashback: 8, image: blendersImage },
    { id: 7, name: 'Home appliance', price: 19, cashback: 6, image: homeApplianceImage },
    { id: 8, name: 'Coffee maker', price: 10, cashback: 12, image: coffeeMakerImage }
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
            overflow: 'visible',
            position: 'relative',
            p: 2,
            '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, pt: 0 }}>
            <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
                sx={{ width: 120, height: 120, objectFit: 'contain' }}
            />
        </Box>
        <Typography variant="body1" gutterBottom>{category.name}</Typography>
        <Typography variant="body2" color="text.secondary">From</Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
                1  pc
            </Typography>
            <Typography
                variant="body2"
                fontWeight="medium"
                sx={{ ml: 0.5 }}
            >
                KSH {category.price}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    ml: 0.5,
                    color: 'success.main',
                    fontWeight: 'medium'
                }}
            >
                +{category.cashback}% cashback
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
                1 - 6 pc
            </Typography>
            <Typography
                variant="body2"
                fontWeight="medium"
                sx={{ ml: 0.5 }}
            >
                KSH {category.price}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    ml: 0.5,
                    color: 'success.main',
                    fontWeight: 'medium'
                }}
            >
                +{category.cashback}% cashback
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
                1 -12 pc
            </Typography>
            <Typography
                variant="body2"
                fontWeight="medium"
                sx={{ ml: 0.5 }}
            >
                KSH {category.price}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    ml: 0.5,
                    color: 'success.main',
                    fontWeight: 'medium'
                }}
            >
                +{category.cashback}% cashback
            </Typography>
        </Box>
    </Card>
);

const ProductCategories = ({header}) => {
    return (
        <Box sx={{ px: 6, py: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                {header}
            </Typography>
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation
                modules={[Autoplay, Navigation]}
                style={{ padding: '10px 0' }}
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
