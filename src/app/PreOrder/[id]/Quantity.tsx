"use client";

import React, { useState } from 'react';

function QuantitySelector() {
  const [quantity, setQuantity] = useState(0); // Set initial quantity to 0

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center border border-gray-200 rounded">
      <button
        type="button"
        className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        onClick={decreaseQuantity}
      >
        -
      </button>

      <input
        type="number"
        id="Quantity"
        value={quantity}
        className="h-12 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="button"
        className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;


// import React, { useState, useContext } from 'react';
// import { CartContext } from '@/app/cartcontext/page';

// interface QuantitySelectorProps {
//   quantity: number;
//   setQuantity: React.Dispatch<React.SetStateAction<number>>;
// }

// function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
//   const decreaseQuantity = () => {
//     setQuantity((prevQuantity: number) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
//   };

//   const increaseQuantity = () => {
//     setQuantity((prevQuantity: number) => prevQuantity + 1);
//   };

//   return (
//     <div className="flex items-center border border-gray-200 rounded">
//       <button
//         type="button"
//         className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
//         onClick={decreaseQuantity}
//       >
//         -
//       </button>

//       <input
//         type="number"
//         id="Quantity"
//         value={quantity}
//         className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
//         readOnly
//       />

//       <button
//         type="button"
//         className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
//         onClick={increaseQuantity}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default function AddToCartButton() {
//   const [quantity, setQuantity] = useState<number>(0); // Track the quantity using state
//   const { addToCart } = useContext(CartContext);

//   const handleAddToCart = () => {
//     const item = {
//       name: 'Product',
//       quantity: quantity,
//       price: 10, // Example price
//     };

//     addToCart(item); // Add the item to the cart

//     setQuantity(0); // Reset the quantity to 0 after adding to the cart
//   };

//   return (
//     <div>
//       <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

//       <div className="flex mt-8">
//         <button
//           type="submit"
//           className="block rounded bg-gray-800 px-12 py-3 text-sm font-semibold text-white hover:bg-yellow-700"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }


