import NewsLetter from "@/components/hero/NewsLetter";
import Accessaries from "@/app/(products)/Accessaries/page";
import Promotions from "@/components/hero/Promotions";
import Hero from "@/components/hero/page";
import Producth from "./(products)/Product-h/page";
import Link from "next/link";


export default function Home() {
  return (
   <div>
   <Hero images={[]}/>
   {/* @ts-expect-error Async Server Component*/}
   <Promotions/>
   {/* @ts-expect-error Async Server Component*/}
   <Producth/>
   {/* @ts-expect-error Async Server Component*/}
   <Accessaries/>
   <NewsLetter/>
   </div>
  )
}
