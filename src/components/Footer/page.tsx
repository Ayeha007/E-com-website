import { FaFacebookF, FaTwitter, FaLinkedinIn} from "react-icons/fa";

export default function Footer (){
return(
  <div>   
<footer className="bg-gray-50">
  <div className="mx-auto w-full px-4 pb-8 pt-10 sm:px-6 lg:px-8">

    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="mx-auto max-w-sm lg:max-w-none pt-3">
         {/* Logo */}
         <div className='flex justify-center'>
              <h2 className="text-2xl text-black font-bold ">Style</h2>
             <h3 className="text-2xl font-normal italic tracking-widest text-yellow-700">Maven</h3>
         </div>
        <p className="mt-6 text-center text-gray-600 lg:text-lg">
        Small, artisan label that offers a <br/> thoughtfully curated collection of high <br/> quality everyday essentials made.
        </p>

        <div className="mt-6 flex justify-center gap-8">
           <FaFacebookF className="fill-yellow-700 w-6 h-6 hover:fill-gray-700"/>
           <FaTwitter className="fill-yellow-700 w-6 h-6 hover:fill-gray-700"/>
           <FaLinkedinIn className="fill-yellow-700 w-6 h-6 hover:fill-gray-700"/>
        </div>
      </div>
 
      {/* Menu Link  */}

      <div
        className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left lg:pr-20 mt-4">
        <div>
          <h3 className="font-bold text-xl text-yellow-700"> Company </h3>
          <div className="mt-6 flex flex-col space-y-2" >
            <div className="text-gray-700  hover:text-yellow-700">
            About
            </div>
            <div className="text-gray-700  hover:text-yellow-700">
            Terms of Use
            </div>
            <div className="text-gray-700  hover:text-yellow-700">
            Privacy Policy
            </div>
            <div className="text-gray-700  hover:text-yellow-700">
            How it Works
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl text-yellow-700"> Support </h3>

          <div className="mt-6 flex flex-col space-y-2">
            <div className="text-gray-700 transition hover:text-yellow-700">
              Support careers
            </div>
            <div className="text-gray-700 transition hover:text-yellow-700">
            24h Service
            </div>
            <div className="text-gray-700 transition hover:text-yellow-700">
            Quick Chat
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl text-yellow-700"> Contact </h3>

          <div className="mt-6 flex flex-col space-y-2">
            <div className="text-gray-700 transition hover:text-yellow-700">
            Whatsapp
            </div>
            <div className="text-gray-700 transition hover:text-yellow-700">
            Support 24h
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-16 border-t border-gray-700 pt-8">
      <p className="text-center text-normal text-gray-500">
       Copyright © 2023 Style Maven. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  </div>
)
}
