'use client';
import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanityClient';
import { urlForImage } from '../../../../sanity/lib/image';
import { Image as IImage } from 'sanity';
import SizeOptions from './Sizes';

import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useCounterContext } from '@/components/useCounterContext';

interface IProduct {
  _id: string;
  image: IImage[];
  price: number;
  sale_price: number;
  title: string;
  details: string;
  on_sale: boolean;
}

type CartProduct = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: IImage;
};

export default function Pre({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { counter, setCounter } = useCounterContext();

  const changeQuantity = (value: number) => {
    // Don't allow the quantity to be less than 0
    setQuantity(Math.max(0, value));
  };

  const decreaseQuantity = () => {
    changeQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    changeQuantity(quantity + 1);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    changeQuantity(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

    if (params.id && !loading) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className='h-72 w-full flex justify-center items-center mt-16'>
        Loading...
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Logic for adding product to the cart

  const handleAddToCart = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let price = product.on_sale ? product.sale_price : product.price;

    let cartData: CartProduct[] = [];

    let cartProduct: CartProduct = {
      _id: product?._id,
      title: product?.title,
      price: price,
      quantity: quantity,
      image: product?.image[0],
    };

    if (localStorage.getItem('cart')) {
      let data = localStorage.getItem('cart');
      cartData = JSON.parse(String(data));
      let idx: number = -1;
      cartData.map((item: CartProduct, index: number) => {
        if (item._id === cartProduct._id) {
          let qty: number = item.quantity;
          qty = qty + cartProduct.quantity;

          cartProduct.quantity = qty;
          idx = index;
        }
      });

      if (idx !== -1) {
        cartData.splice(idx, 1, cartProduct);
      } else {
        cartData.push(cartProduct);
      }
    } else {
      cartData.push(cartProduct);
    }

    console.log('cartProduct: ', cartProduct);
    let totalItems = cartData.length;
    setCounter(totalItems);

    let data = JSON.stringify(cartData);

    localStorage.removeItem('cart');

    setTimeout(() => {
      localStorage.setItem('cart', data);
    }, 1000);
  };

  return (
    <section>
      <div className='relative mx-auto max-w-screen-xl lg:mt-32 mt-20 px-4 lg:px-16 py-8'>
        <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 p-8'>
          <div className='grid grid-cols-1 gap-4'>
            {product.image && product.image[0] && (
              <Image
                alt='product image'
                src={urlForImage(product.image[0] as any).url()}
                height={300}
                width={300}
                className='aspect-square w-full rounded-xl object-cover'
              />
            )}
            <div className='grid grid-cols-3 gap-4 lg:mt-4'>
              {product.image &&
                product.image.map((image, index) => (
                  <Image
                    key={index}
                    alt={`Product Image ${index + 1}`}
                    src={(urlForImage(image) as any).url()}
                    height={200}
                    width={200}
                    className='aspect-square w-full rounded-xl object-cover'
                  />
                ))}
            </div>
          </div>

          <div className='sticky top-0 pt-10'>
            <strong className='rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600'>
              Pre Order
            </strong>

            <div className='mt-8 flex justify-between items-center'>
              <div className='max-w-[35ch] space-y-2'>
                <h1 className='text-xl font-bold sm:text-2xl'>
                  {product.title}
                </h1>
              </div>
              {product.sale_price ? (
                <div className='flex space-x-8 items-center mt-1.5'>
                  <p className='my-2 font-bold text-lg text-green-500 line-through'>
                    ${product.price}
                  </p>
                  <p className='my-2 font-bold text-lg text-red-500 '>
                    ${product.sale_price}
                  </p>
                </div>
              ) : (
                <p className='my-2 font-bold text-lg text-gray-700'>
                  ${product.price}
                </p>
              )}
            </div>

            <div className='prose max-w-none mt-4'>
              <p>{product.details}</p>
            </div>

            <form className='mt-8'>
              <fieldset className='mt-4'>
                <legend className='mb-1 text-sm font-medium'>Size</legend>
                <SizeOptions />
              </fieldset>

              <div className='flex mt-8 space-x-4'>
              

                <div className='flex items-center border border-gray-200 rounded'>
                  <button
                    type='button'
                    className='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>

                  <input
                    type='number'
                    id='Quantity'
                    value={quantity}
                    onChange={onInputChange}
                    className='h-12 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
                  />

                  <button
                    type='button'
                    className='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='flex-col justify-start mt-6'>
               
                <button
                  onClick={handleAddToCart}
                  className='block rounded bg-gray-800 px-12 py-4 font-normal text-white hover:bg-yellow-700'>
                  Add To Cart
                </button>
               
                <div className='pt-6'>
                <Link href={`/checkout`}>
                 <a className="block rounded bg-gray-800 px-12 py-4 font-normal text-white hover:bg-yellow-700"
                 > Buy Now</a>
               
                </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


