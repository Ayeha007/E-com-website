import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});


export  async function POST(req: any, res: NextResponse){
    const {item}= await req.json();

    const transformedItem = {
         price_data: {
          currency: 'usd',
          product_data:{
            name: item.name,
            description: item.description,
            images:[item.image],
            metadata:{},

          },
          unit_amount: item.price * 100,

        },
          quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
        
      };
      const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'https://style-maven-e-com.vercel.app/'
      : 'your deployed url';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NJgGfFFOcRRviB5IKHisAI1" },
          { shipping_rate: "shr_1NJgFzFFOcRRviB5RNlrrnhM" },
        ],
        invoice_creation: {
          enabled: true,
        },
        success_url: redirectURL + '/payment/success',
        cancel_url: redirectURL + '/payment/fail',
        metadata: {
          images: item.image,
          name:"some additional info",
          task:"Usman created a task"
        },
      });

    //    console.log("response-------------------",await session);
    return NextResponse.json(session?.id) ;
  };