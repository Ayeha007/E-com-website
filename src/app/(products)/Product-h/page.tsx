import React from 'react';
import Image from 'next/image';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import Link from 'next/link';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

export const getProductData: () => Promise<IProduct[]> = async () => {
  const res = await client.fetch(
    `*[_type == 'product' && sale_price != null] {
      _id,
      title,
      price,
      sale_price,
      details,
      image
    }`
  );
  return res;
};

interface IProduct {
  _id: string;
  image: IImage[] | undefined;
  price: number;
  sale_price:number;
  title: string;
  details: string;
}

export default async function Producth() {
  const data: IProduct[] = await getProductData();
  
  return (
    <section>
      <div className="max-w-screen-xl px-5 lg:px-8 py-12 lg:py-24 mx-auto ">
        <header className="text-center">
          <h2 className="text-xl font-bold text-yellow-700 sm:text-3xl">
            Sale Collection
          </h2>
          <p className="max-w-full mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium <br/> cumque  iure dicta incidunt est ipsam, <br/>officia dolor fugit natus.
          </p>
        </header>

        {/* Horizontal Cards */}

        <div className="scrollbar-hide overflow-x-auto">
        {/* <div className='flex justify-center item-center space-x-[200px]'>
                <BsFillArrowLeftCircleFill/>
                <BsFillArrowRightCircleFill/>
              </div> */}
          <div className="flex gap-4 mt-8 justify-start">     
      
            {data.map((item: IProduct) => (
            <div key={item._id} className="flex-shrink-0 w-72 sm:w-1/4 shadow-lg">
            <div className="relative block overflow-hidden group">
              {item.image && item.image[0] && (
                <Image
                  src={urlForImage(item.image[0] as any).url()}
                  alt="Product Pic"
                  className="h-[350px] w-full rounded-md object-cover transition duration-500 group-hover:scale-105 sm:h-[450px] group-hover:rounded-lg"
                  width={500}
                  height={500}
                />
              )}
             
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 group-hover:scale-105 sm:h-[450px] group-hover:rounded-lg">
                <div className="flex-col justify-center items-center h-44 rounded-md bg-gray-500/25">
                  <h3 className="mt-2 mx-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  {item.sale_price ? (
                    <div className="flex gap-[100px] items-center mt-1.5 mx-4">
                      <p className="text-xl font-normal text-white line-through">
                        ${item.price}
                      </p>
                      <p className="mt-0.5 text-2xl font-normal text-red-500">
                        ${item.sale_price}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1.5 mx-4 text-xl font-normal text-white">
                    ${item.price}
                    </p>
                  )}
                  <p className="mt-1.5 mx-4 max-w-[100ch] text-xs text-white">
                    {item.details}
                  </p>
                  <Link href={`/PreOrder/${item._id}`} className='flex justify-center'>
                  <span className="inline-block  px-20 py-3 mt-3 text-xs font-medium rounded-md tracking-widest text-white uppercase bg-gray-800 hover:bg-yellow-700">
                    Shop Now
                  </span>
                </Link>
                
                </div>
              </div>
          </div>
        </div>
      ))}


          </div>
        </div>
      </div>
    </section>
  );
}

