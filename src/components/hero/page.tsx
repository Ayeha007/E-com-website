import React from 'react';
import Slider from './Slider';
import Promotions from './Promotions';
import Producth from './Product-h/Product-h';
import NewsLetter from './NewsLetter';

const Hero = () => {
  const sliderImages: string[] = [];

  return (
    <div className='lg:py-24 pt-16'>
      <Slider images={sliderImages} />
    </div>
  );
};

export default Hero;







