import React from 'react';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('./Slider'));

const Hero = () => {
  const sliderImages: string[] = [];

  return (
    <div className='lg:py-24 pt-16'>
      <div>Github Testing</div>
      <Slider images={sliderImages} />
    </div>
  );
};

export default Hero;







