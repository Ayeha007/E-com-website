import { cookies } from 'next/dist/client/components/headers';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { db, cartTable } from '@/lib/drizzle';
import { Image as IImage } from 'sanity';
import { a, ad } from 'drizzle-orm/column.d-66a08b85';
import { v4 as uuid } from "uuid";
import { Placeholder, SQL } from 'drizzle-orm';

type CartProduct = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: IImage;
};

export const GET = async (request: Request) => {
  try {
    const res = await db.select().from(cartTable);
    console.log('GET - res:', res);
    return NextResponse.json({ res });
  } catch (error) {
    console.log('GET - error:', error);
    return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
  }
};

export const POST = async (request: Request) => {
  let cartData: CartProduct[] = [];
  let dbData:
    | {
        user_id: string | a<unknown> | ad<string, any>;
        product_id: string | a<unknown> | ad<string, any>;
        quantity: number | a<unknown> | ad<string, any>;
        id?: number | a<unknown> | ad<string, any> | undefined;
      }[]
    | { product_id: string; quantity: number; user_id: any }[] = [];
  const data = await request
    .json()
    .then(async (response) => {
      console.log('response: ', response);
      cartData = response.data;

      cartData.map((item) => {
        console.log('item: ', item);
        let data = {
          product_id: item._id,
          quantity: item.quantity,
          user_id: response.userId,
        };

        dbData.push(data);
      });
      const dbRes = await db.insert(cartTable).values(dbData).returning();

      return dbRes;
    })
    .catch((error) => {
      console.log('body-error: ', error);
    });

  console.log('data: ', data);

  return NextResponse.json({ data });
}


// import { auth } from '@clerk/nextjs';
// import { NextRequest, NextResponse } from 'next/server';
// import { db, cartTable } from '@/lib/drizzle';
// import { Image as IImage } from 'sanity';
// import { v4 as uuid } from 'uuid';
// import { Placeholder, SQL } from 'drizzle-orm';

// type CartProduct = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: IImage;
// };

// export const GET = async (request: Request) => {
//   try {
//     const res = await db.select().from(cartTable);
//     console.log('GET - res:', res);
//     return NextResponse.json({ res });
//   } catch (error) {
//     console.log('GET - error:', error);
//     return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
//   }
// };

// export const POST = async (request: Request) => {
//   try {
//     const { data } = await request.json();
//     console.log('data: ', data);

//     let userId = localStorage.getItem('userId');

//     // Generate a new UUID if userId is not available in local storage
//     if (!userId) {
//       userId = uuid();
//       localStorage.setItem('userId', userId);
//     }

//     const cartData: CartProduct[] = data;

//     // Create a new array with updated user_id values
//     const dbData = cartData.map((item) => ({
//       product_id: item._id,
//       quantity: item.quantity,
//       user_id: userId,
//     }));

//     const dbRes = await db.insert(cartTable).values(dbData).returning().execute();

//     // Save cart data to local storage
//     localStorage.setItem('cartData', JSON.stringify(cartData));

//     return NextResponse.json({ data: dbRes });
//   } catch (error) {
//     console.log('POST - error:', error);
//     return NextResponse.json({ message: 'Oops!!! Something Went Wrong' });
//   }
// };

