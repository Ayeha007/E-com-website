import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";

export const GET =async (request:Request) => {
    try {
        const res = await db.select().from(cartTable);
        return NextResponse.json({res})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Oops!!! Something Went Wrong'})
    }
} 

export const POST =async (request:Request) => {
    const req = await request.json()
    try {
        const res = await db.insert(cartTable).values({
            product_id: req.product_id,
            quantity: 1,
            user_id: ''
        });
        return NextResponse.json({res})
    } catch (error) {
               
    }
} 