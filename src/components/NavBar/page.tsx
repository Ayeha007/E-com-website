'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiShoppingBag } from 'react-icons/hi';
import { MdClose, MdMenu } from 'react-icons/md';
import SearchBar from './SearchBar';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCounterContext } from '../useCounterContext';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { counter, setCounter } = useCounterContext();
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();

  console.log('userId: ', userId);

  const categories = [
    { name: 'Home', link: '/' },
    { name: 'Female', link: '/female' },
    { name: 'Male', link: '/male' },
    { name: 'Kids', link: '/kids' },
    { name: 'All Products', link: '/allproducts' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  useEffect(() => {
    if (localStorage.getItem('cart')) {
      let data = localStorage.getItem('cart');

      let cData = JSON.parse(String(data));

      setCounter(cData.length);
    }
  }, []);


  return (
    <nav className='w-full py-4 bg-gray-100 shadow-xl fixed top-0 left-0 right-0 z-10'>
      <div className='flex justify-between items-center px-4 md:px-8'>

        {/* Logo */}
        <div className='flex py-4'>
          <h2 className="text-2xl text-black font-bold">Style</h2>
          <h3 className="text-2xl font-normal italic tracking-widest text-yellow-700">Maven</h3>
        </div>
        {/* Categories */}
        <div className='hidden md:block'>
          <ul className="flex items-center space-x-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className="text-xl text-black py-4 px-6 text-center hover:text-yellow-700"
              >
                <Link href={category.link}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center space-x-8'>
          <div className='hidden md:flex items-center space-x-4'>

          {/* Searchbar */}
          <SearchBar />

          {/* Cart */}
            <div className="relative flex items-center">
            <button
            onClick={(e) => {
              router.push('/checkout');
            }}
            className='ml-2'
          ><HiShoppingBag className="w-8 h-8" /></button>

              <div className="absolute -top-2 right-0 flex items-center justify-center w-5 h-5 bg-red-600 rounded-full">
                <div className="font-light text-xs text-white">{counter}</div>
              </div>
            </div>

          {/* Sign In */}
          {!isLoaded || !isSignedIn ? (
            <div className='block rounded bg-gray-800 px-12 py-3 font-normal text-white hover:bg-yellow-700'>
              <Link href='/signin'>Sign In</Link>
            </div>
          ) : (
            <div className=''>
              <UserButton afterSignOutUrl='/' />
            </div>
          )}  
          </div>

         {/* Mobile Menu */}
          <div className='md:hidden flex items-center space-x-4'>
          <div className="relative flex items-center">
                 <button
            onClick={(e) => {
              router.push('/checkout');
            }}
            className='ml-2'
          ><HiShoppingBag className="w-8 h-8" /></button>
              <div className="absolute -top-2 right-0 flex items-center justify-center w-5 h-5 bg-red-600 rounded-full">
                <div className="font-light text-xs text-white">{counter}</div>
              </div>
            </div>
            {isMenuOpen ? (
              <MdClose className='w-8 h-8' onClick={toggleMenu} />
            ) : (
              <MdMenu className='w-8 h-8' onClick={toggleMenu} />
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
       <div className='md:hidden'>
          <ul className="flex flex-col items-center bg-white h-[500px]">
            {categories.map((category, index) => (
              <li
                key={index}
                className="text-xl text-black py-4 px-6 text-center hover:text-yellow-700"
              >
                <Link href={category.link} onClick={closeMenu}>
                  {category.name}
                </Link>
              </li>
            ))}

            {/* Sign In */}
          {!isLoaded || !isSignedIn ? (
            <div className='block rounded bg-gray-800 px-12 py-3 font-normal text-white hover:bg-yellow-700'>
              <Link href='/signin' onClick={closeMenu}> 
              Sign In
              </Link>
            </div>
          ) : (
            <div className=''>
              <UserButton afterSignOutUrl='/' />
            </div>
          )}  
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;




