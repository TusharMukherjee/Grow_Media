/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex ('users').insert([
    {
      username: "tushar",
      email: "tushar@tushar.com",
      password: "tushar123",
      bio: "tushar's bio",
      link: "tushar's link"
    },
    {
      username: "chetan",
      email: "chetan@chetan.com",
      password: "chetan123",
      bio: "chetan's bio",
      link: "chetan's link"
    },
    {
      username: "lovish",
      email: "lovish@lovish.com",
      password: "lovish123",
    },
    {
      username: "himanshu",
      email: "himanshu@himanshu.com",
      password: "himanshu123",
      bio: "himanshu's bio",
      link: "himanshu's link"
    }
  ]);

  await knex('blogs').insert([
    {
      buser_id: 1,
      heading: "heading 1",
      content: "lorem20",
    },
    {
      buser_id: 2,
      heading: "heading 1",
      content: "lorem20",
    },
    {
      buser_id: 2,
      heading: "heading 1",
      content: "lorem20",
    },
    {
      buser_id: 4,
      heading: "heading 1",
      content: "lorem20",
    },
    {
      buser_id: 3,
      heading: "heading 1",
      content: "lorem20",
    },
    {
      buser_id: 4,
      heading: "heading 1",
      content: "lorem20",
    }
  ]);

};









// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
