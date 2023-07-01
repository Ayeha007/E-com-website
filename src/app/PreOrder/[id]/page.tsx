'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import SizeOptions from './Sizes';
import QuantitySelector from './Quantity';
import BuyNowButton from '../BuyNowButton';



interface IProduct {
  _id: string;
  image: IImage[];
  price: number;
  sale_price: number;
  title: string;
  details: string;
}

export default function Pre({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(
          `*[_type == 'product' && _id == "${params.id}"][0]`
        );

        setProduct(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    // Logic for adding product to the cart
  };

  return (
    <section>
      <div className="relative mx-auto max-w-screen-xl lg:mt-32 mt-20 px-4 lg:px-16 py-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 p-8">
          <div className="grid grid-cols-1 gap-4">
            {product.image && product.image[0] && (
              <Image
                alt="product image"
                src={urlForImage(product.image[0] as any).url()}
                height={300}
                width={300}
                className="aspect-square w-full rounded-xl object-cover"
              />
            )}
            <div className="grid grid-cols-3 gap-4 lg:mt-4">
              {product.image &&
                product.image.map((image, index) => (
                  <Image
                    key={index}
                    alt={`Product Image ${index + 1}`}
                    src={(urlForImage(image) as any).url()}
                    height={200}
                    width={200}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                ))}
            </div>
          </div>

          <div className="sticky top-0 pt-10">
            <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              Pre Order
            </strong>

            <div className="mt-8 flex justify-between items-center">
              <div className="max-w-[35ch] space-y-2">
                <h1 className="text-xl font-bold sm:text-2xl">{product.title}</h1>
              </div>
              {product.sale_price ? (
                <div className="flex space-x-8 items-center mt-1.5">
                  <p className="my-2 font-bold text-lg text-green-500 line-through">
                    ${product.price}
                  </p>
                  <p className="my-2 font-bold text-lg text-red-500 ">
                    ${product.sale_price}
                  </p>
                </div>
              ) : (
                <p className="my-2 font-bold text-lg text-gray-700">${product.price}</p>
              )}
            </div>

            <div className="prose max-w-none mt-4">
              <p>{product.details}</p>
            </div>

            <form className="mt-8">
              <fieldset className="mt-4">
                <legend className="mb-1 text-sm font-medium">Size</legend>
                <SizeOptions />
              </fieldset>

              <div className="flex mt-8 space-x-4">
               
                  <QuantitySelector />
                </div>
                <div className="flex justify-start mt-6 ">
                <BuyNowButton/>
                  {/* <ShopNowButton onClick={handleAddToCart} /> */}
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}




