import { sql } from '@vercel/postgres';
import { InferModel } from 'drizzle-orm';
import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { NextResponse, NextRequest } from 'next/server';

export { GET, POST };

// Define the cartTable schema
export const cartT = pgTable("cartTable", {
    id: serial("id").primaryKey().notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    product_id: varchar("product_id", { length: 255 }).notNull(),
    product_name: varchar("product_name", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
    total_price: integer("total_price").notNull(),
});

export type Cart = InferModel<typeof cartT>;

// Initialize the drizzle instance
export const db = drizzle(sql);

// Handle GET requests

async function GET(request: NextRequest) {
  try {
    console.log("GET request received");
    
    // Use Drizzle ORM to execute a SQL SELECT query to retrieve all entries from the "cartTable"
    const cartData = await db.select().from(cartT);
    
    console.log("Retrieved cart data:", cartData);
    
    // Return the retrieved cart data as a JSON response
    return NextResponse.json(cartData);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
 
// Handle POST requests

async function POST(request: NextRequest) {
  try {
    // Extract JSON data from the incoming request
    const req = await request.json();
    
    // Extract the relevant information from the request object
    const { userId, cartProduct } = req;
    
    // Calculate the total price as cents (integer)
    const totalPriceCents = Math.round(cartProduct.price * 100);

    // Create a new cart entry with extracted data
    const newCartEntry = {
      user_id: userId,
      product_id: cartProduct._id,
      product_name: cartProduct.title,
      quantity: cartProduct.quantity,
      total_price: totalPriceCents,
    };
    
    // Insert the new cart entry into the "cartTable" using Drizzle ORM
    const insertedCartEntry = await db.insert(cartT).values(newCartEntry).returning();
    
    // Return the inserted cart entry data as a JSON response
    return NextResponse.json(insertedCartEntry);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
