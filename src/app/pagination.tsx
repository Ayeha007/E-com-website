// 'use client';

// import React, { useState, useEffect } from 'react';
// import { getProductData } from './allproducts/page';

// const Pagination = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getProductData();
//       const totalItems = res.length;
//       const itemsPerPage = 6; // Number of items to display per page
//       const totalPages = Math.ceil(totalItems / itemsPerPage);
//       setTotalPages(totalPages);
//     };

//     fetchData();
//   }, []);

//   const handlePageChange = (page:any
    
//     ) => {
//     setCurrentPage(page);
//   };

//   const fetchProducts = async () => {
//     const res = await getProductData();
//     const itemsPerPage = 6; // Number of items to display per page
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return res.slice(startIndex, startIndex + itemsPerPage);

//   };

//   const renderPagination = () => {
//     const pages = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`mx-1 px-3 py-2 rounded ${
//             i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="pagination">
//       <div className="pagination-buttons">{renderPagination()}</div>
//     </div>
//   );
// };

// export default Pagination;



// import React, { useState, useEffect } from 'react';
// import { getProductData } from './(products)/allproducts/page';
// import { Image as IImage } from 'sanity';


// export interface IProduct {
//     _id: string;
//     image: IImage[] | undefined;
//     price: number;
//     sale_price: number;
//     title: string;
//     details: string;
//   }


// const Pagination = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getProductData();
//       const totalItems = res.length;
//       const itemsPerPage = 6; // Number of items to display per page
//       const totalPages = Math.ceil(totalItems / itemsPerPage);
//       setTotalPages(totalPages);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await getProductData();
//       const itemsPerPage = 6; // Number of items to display per page
//       const startIndex = (currentPage - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       const slicedProducts = res.slice(startIndex, endIndex);
//       setProducts(slicedProducts);
//     };

//     fetchProducts();
//   }, [currentPage]);

//   const handlePageChange = (page:any) => {
//     setCurrentPage(page);
//   };

//   const renderProducts = () => {
//     return products.map((product: IProduct) => (
//       <Product key={product._id} data={product} />
//     ));
//   };
  
//   const renderPagination = () => {
//     const pages = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`mx-1 px-3 py-2 rounded ${
//             i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="pagination">
//       <div className="products">{renderProducts()}</div>
//       <div className="pagination-buttons">{renderPagination()}</div>
//     </div>
//   );
// };

// export default Pagination;

