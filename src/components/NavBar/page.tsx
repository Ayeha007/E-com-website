'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiShoppingBag } from "react-icons/hi";
import { MdClose, MdMenu } from "react-icons/md";
import SearchBar from './SearchBar';

function NavBar() {
  const [navbar, setNavbar] = useState(false);

  const categories = [
    { name: 'Home', link: '/' },
    { name: 'Female', link: '/female' },
    { name: 'Male', link: '/male' },
    { name: 'Kids', link: '/kids' },
    { name: 'All Products', link: '/allproducts' },
  ];

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <nav className="w-full bg-gray-100 shadow-xl fixed top-0 left-0 right-0 z-10">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div className="flex items-center space-x-32">
            <div className="flex">
              <h2 className="text-2xl text-black font-bold">Style</h2>
              <h3 className="text-2xl font-normal italic tracking-widest text-yellow-700">Maven</h3>
            </div>
            <div className="hidden lg:flex justify-center items-center ml-6">
              <ul className="flex justify-center cursor-pointer">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="text-xl text-black py-4 px-6 text-center hover:text-yellow-700"
                  >
                    <Link href={category.link} onClick={toggleNavbar}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex items-center w-12 h-12 bg-gray-100 rounded-full">
                <div className="relative flex items-center">
                  <div className="ml-2">
                    <HiShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 rounded-full">
                    <div className="font-light text-xs text-white">0</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="p-2" onClick={toggleNavbar}>
                  {navbar ? (
                    <MdClose className='w-6 h-6 fill-black'/>
                  ) : (
                    <MdMenu className='w-6 h-6 fill-black'/>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center ml-auto">
          <SearchBar />
        </div>
        <div className="hidden lg:flex items-center ml-4">
          <div className="flex items-center w-12 h-12 bg-gray-100 rounded-full">
            <div className="relative flex items-center">
              <div className="ml-2">
                <HiShoppingBag className="w-8 h-8" />
              </div>
              <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 rounded-full">
                <div className="font-light text-xs text-white">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`lg:hidden justify-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'}`}>
        <ul className="h-screen md:h-auto items-center justify-center md:flex cursor-pointer">
          {categories.map((category, index) => (
            <li
              key={index}
              className="text-xl text-black py-4 px-6 text-center hover:text-yellow-700"
            >
              <Link href={category.link} onClick={toggleNavbar}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center w-12 h-12 bg-gray-100 rounded-full">
              <div className="relative flex items-center">
                <div className="ml-2">
                  <HiShoppingBag className="w-8 h-8" />
                </div>
                <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 rounded-full">
                  <div className="font-light text-xs text-white">0</div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2" onClick={toggleNavbar}>
                {navbar ? (
                  <MdClose className='w-6 h-6 fill-black'/>
                ) : (
                  <MdMenu className='w-6 h-6 fill-black'/>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

// import Link from 'next/link';
// import { useState } from 'react';
// import { HiShoppingBag } from "react-icons/hi";
// import { MdClose, MdMenu } from "react-icons/md";
// import SearchBar from './SearchBar';

// function NavBar() {
//   const [navbar, setNavbar] = useState(false);

//   const categories = [
//     { name: 'Home', link: '/' },
//     { name: 'Female', link: '/female' },
//     { name: 'Male', link: '/male' },
//     { name: 'Kids', link: '/kids' },
//     { name: 'All Products', link: '/allproducts' },
//   ];

//   return (
//     <div>
//       <nav className="w-full bg-gray-100 shadow-xl fixed top-0 left-0 right-0 z-10">
//         <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
//           <div className="flex items-center justify-between py-3 md:py-5 md:block">
//             <div className="flex items-center space-x-32">
//               <div className="flex">
//                 <h2 className="text-2xl text-black font-bold">Style</h2>
//                 <h3 className="text-2xl font-normal italic tracking-widest text-yellow-700">Maven</h3>
//               </div>
//               <div className="hidden lg:flex justify-center items-center ml-6">
//                 <ul className="flex justify-center">
//                   {categories.map((category, index) => (
//                     <li
//                       key={index}
//                       className="text-xl text-black py-4 px-6 text-center hover:text-yellow-700"
//                     >
//                       <Link href={category.link} onClick={() => setNavbar(!navbar)}>
//                         {category.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="md:hidden flex items-center space-x-4">
//               <div className="flex items-center">
//                 <div className="flex items-center w-12 h-12 bg-gray-100 rounded-full">
//                   <div className="relative flex items-center">
//                     <div className="ml-2">
//                       <HiShoppingBag className="w-8 h-8" />
//                     </div>
//                     <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 rounded-full">
//                       <div className="font-light text-xs text-white">0</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <button
//                     className="p-2"
//                     onClick={() => setNavbar(!navbar)}
//                   >
//                     {navbar ? (
//                       <div><MdClose className='w-6 h-6 fill-black'/></div>
//                     ) : (
//                       <div><MdMenu className='w-6 h-6 fill-black'/></div>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Searchbar */}
//           <div className="hidden lg:flex items-center ml-auto">
//             <SearchBar />
//           </div>
//           {/* Cart */}
//           <div className="hidden lg:flex items-center ml-4">
//             <div className="flex items-center w-12 h-12 bg-gray-100 rounded-full">
//               <div className="relative flex items-center">
//                 <div className="ml-2">
//                   <HiShoppingBag className="w-8 h-8" />
//                 </div>
//                 <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 rounded-full">
//                   <div className="font-light text-xs text-white">0</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile categories */}
//         <div
//           className={`lg:hidden justify-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//             navbar ? 'p-12 md:p-0 block' : 'hidden'
//           }`}
//         >
//           <ul className="h-screen md:h-auto items-center justify-center md:flex">
//             {categories.map((category, index) => (
//               <li
//                 key={index}
//                 className="text-xl text-black py-4 px-6 text-center hover:text-yellow-700"
//               >
//                 <Link href={category.link} onClick={() => setNavbar(!navbar)}>
//                   {category.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <div className="flex items-center justify-center mt-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center w-12 h-12 bg-gray-100 rounded-full">
//                 <div className="relative flex items-center">
//                   <div className="ml-2">
//                     <HiShoppingBag className="w-8 h-8" />
//                   </div>
//                   <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 rounded-full">
//                     <div className="font-light text-xs text-white">0</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <button
//                   className="p-2"
//                   onClick={() => setNavbar(!navbar)}
//                 >
//                   {navbar ? (
//                     <div><MdClose className='w-6 h-6 fill-black'/></div>
//                   ) : (
//                     <div><MdMenu className='w-6 h-6 fill-black'/></div>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default NavBar;


