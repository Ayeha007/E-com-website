import { Rule } from "sanity";

export const Category =  {
  title: "Category",
  name: "category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name", /// For single category
      type: "string"
    },

     {
        name: "slug",
        title: "Slug",
        type: "slug",
        validation: (Rule: Rule) => Rule.required(),
        options: {
          source: "name",
          maxLength: 96
        }
      },


    //  {
    //         name: 'Title',         //// For Mulitple Categories use this
    //         title: 'Category Name', 
    //         type: 'array',
    //         of:[{
    //             name:'name',
    //             title:'Category Name',
    //             type:'string'
    //         }],
    //     },

  ]
}



// import { defineType, defineField} from "sanity"

// export const Category = defineType(
//   {
//     name: 'category',
//     type: 'document',
//     title: 'Category',
//     fields: [
//         // defineField({
//         //     name: 'name',       ///// For single category use this
//         //     title: 'Category Name',  
//         //     type: 'string'
//         // }),  

//         {
//             name: 'Title',         //// For Mulitple Categories use this
//             title: 'Category Name', 
//             type: 'array',
//             of:[{
//                 name:'name',
//                 title:'Category Name',
//                 type:'string'
//             }],
//         }

//       ]
//   } 
// )
       
   




// // export const category = {
// //     name: 'category',
// //     type: 'document',
// //     title: 'Category',
// //     fields: [
// //         {
// //             name: 'category',
// //             title: 'Category Name',
// //             type: 'array',
// //             of: [{
// //               type: 'reference',
// //               to: [{
// //                 type: 'productCategory',
// //               }],
// //               options: {
// //                 disableNew: true,
// //               }
// //             }]
// //           },
// //     ]
// // }