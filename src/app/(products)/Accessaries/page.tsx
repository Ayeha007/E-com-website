
import React from 'react';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../../sanity/lib/image'; 
import { Image as IImage } from 'sanity';
import Link from 'next/link';
import Image from 'next/image';


export const getProductData = async () => {
  const res = await client.fetch(
    `*[_type == 'product' && category->name == 'Accessaries'] {
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
  sale_price: number;
  title: string;
  details: string;
}

export default async function Accessaries() {
  const data: IProduct[] = await getProductData();

  return (
    <section id="accessaries" className="">
      <div className="max-w-screen px-5 lg:px-20 mx-auto py-12 ">
      <header className="text-center pb-8">
          <h2 className="text-xl font-bold text-yellow-700 sm:text-3xl">
          Accessaries Collection
          </h2>
          <p className="max-w-full mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium <br/> cumque  iure dicta incidunt est ipsam, <br/>officia dolor fugit natus.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
          {data.map((item: IProduct) => (
            <div className="block group" key={item._id}>
              {item.image && item.image[0] && (
                <Image
                  src={urlForImage(item.image[0] as any).url()}
                  alt=""
                  width={500}
                  height={600}
                  className="object-cover h-64 w-full rounded aspect-square"
                />
              )}
              <div className="py-4 px-4 shadow-lg">
                <h3 className="font-bold text-gray-900 group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                {item.sale_price ? (
                  <div className="flex space-x-48 lg:space-x-60 items-center mt-1.5">
                    <p className="my-2.5 text-md text-green-500 line-through">
                      ${item.price}
                    </p>
                    <p className="my-2.5 text-md text-red-500 font-semibold">
                      ${item.sale_price}
                    </p>
                  </div>
                ) : (
                  <p className="my-3.5 text-sm text-gray-700">${item.price}</p>
                )}
              
              <Link href={`/PreOrder/${item._id}`}>
                  <span className="inline-block lg:px-32 px-20 py-3 mt-3 text-xs font-medium rounded-md tracking-widest text-white uppercase bg-gray-800 hover:bg-yellow-700">
                    Shop Now
                  </span>
                </Link>
              
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          {/* <Pagination/> */}
        </div>
      </div>
    </section>
  );
}





