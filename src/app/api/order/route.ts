import { NextRequest, NextResponse } from 'next/server';
import { db, cartTable } from '@/lib/drizzle';
// import { v4 as uuid } from "uuid";
import { cookies } from 'next/dist/client/components/headers';
import { auth } from '@clerk/nextjs';
import { Image as IImage } from 'sanity';
import { a, ad } from 'drizzle-orm/column.d-66a08b85';

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
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
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