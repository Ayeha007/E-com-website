import NewsLetter from "@/components/hero/NewsLetter";
import Accessaries from "@/app/(products)/Accessaries/page";
import Promotions from "@/components/hero/Promotions";
import Hero from "@/components/hero/page";
import Producth from "./(products)/Product-h/page";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
   <div>
    {/* <div className="flex justify-center items-center pt-20 space-x-8">
      <Link href={'/signup'} className="flex justify-center items-center w-36 h-16 rounded-md text-white bg-gray-700 hover:bg-yellow-700">SignUp</Link>
      <Link href={'/signin'} className="flex justify-center items-center w-36 h-16 rounded-md  text-white bg-gray-700 hover:bg-yellow-700">SignIn</Link>
      <UserButton afterSignOutUrl="/"/>
    </div> */}

   <Hero/>
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
