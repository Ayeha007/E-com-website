import React from 'react';
import Slider from './Slider';


const Hero = () => {
  const sliderImages: string[] = [];

  return (
    <div className='lg:py-24 pt-16'>
      <Slider images={sliderImages} />
    </div>
  );
};

export default Hero;







