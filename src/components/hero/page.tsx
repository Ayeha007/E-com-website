// import React from 'react';
// import dynamic from 'next/dynamic';

// const Slider = dynamic(() => import('./Slider'));

// const Hero = () => {
//   const sliderImages: string[] = [];

//   return (
//     <div className='lg:py-24 pt-16'>
//       <div>Github Testing</div>
//       <Slider images={sliderImages} />
//     </div>
//   );
// };

// export default Hero;



'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../sanity/lib/image';
import { Image as IImage } from 'sanity';

interface SliderProps {
  images: string[];
  // Remove the images prop since it will be fetched internally
}

const Slider = ({ }: SliderProps) => {
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await client.fetch(`*[_type=='banner']{
          image,
          _id
        }`);
        const data: { image: IImage }[] = res;
        const imageUrls = data.map((item) => urlForImage(item.image).url());
        setSliderImages(imageUrls);
      } catch (error) {
        console.error('Error fetching slider images:', error);
      }
    };

    fetchSliderImages();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [sliderImages]);
  useEffect(() => {
    const nextSlide = (): void => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    };
  
    const interval = setInterval(nextSlide, 5000);
  
    return () => {
      clearInterval(interval);
    };
  }, [sliderImages]);
  return (
    <div className='lg:py-24 pt-16'>
    <div className="relative w-full lg:h-[480px] ">
      {/* Slider */}
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 639px) {
          .h-full {
            height: 200px; /* Adjust the height as per your requirements */
          }
        }
      `}</style>
    </div>
    </div>
  );
};

export default Slider;




