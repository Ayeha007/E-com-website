import React from 'react';
import Image from 'next/image';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import Link from 'next/link';
// import Pagination from '@/app/pagination';

export const getProductData: () => Promise<IProduct[]> = async () => {
  const res = await client.fetch(
    `*[_type == 'product' && category->name == 'Female'] {
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

export default async function Female() {
  const data: IProduct[] = await getProductData();

  return (
    <section id="female" className="mt-8">
      <div className="max-w-screen px-5 lg:px-20 py-8 lg:py-16 mx-auto ">
      <div
      className="flex items-center justify-center lg:h-[300px] h-[130px] bg-fixed bg-cover bg-center object-cover object-bottom"
      style={{
        backgroundImage: `url('female.jpg')`,
      }}>
        <p className='flex justify-center item-center lg:font-bold font-normal lg:text-4xl text-lg text-rose-500 '> Female Collection</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-10 pt-10">
          {data.map((item: IProduct) => (
            <div className="block group shadow-lg" key={item._id}>
              {item.image && item.image[0] && (
                <Image
                  src={urlForImage(item.image[0] as any).url()}
                  alt=""
                  width={500}
                  height={600}
                  className="object-cover w-full h-64 rounded aspect-square"
                />
              )}
              <div className="py-4 px-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                {item.sale_price ? (
                  <div className="flex space-x-32 lg:space-x-60 items-center mt-1.5">
                    <p className="my-2 text-md text-green-500 line-through">
                      ${item.price}
                    </p>
                    <p className="my-2 text-md text-red-500 font-semibold">
                      ${item.sale_price}
                    </p>
                  </div>
                ) : (
                  <p className="my-4 text-sm text-gray-700">${item.price}</p>
                )}

                  <p className="mt-1.5 mx-4 max-w-[100ch] text-xs text-white">
                    {item.details}
                  </p>

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
          {/* <Pagination /> */}
        </div>
      </div>
    </section>
  );
}