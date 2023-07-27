const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const memberSchema = new Schema({
  name: {
    type: String,
  },
  href: {
    type: String,
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;

//* This is for retrieving the members list from the original website
// let childList5 = document.querySelector('#testtesttesttest').children;

// let allMembers4 = [...childList5].map((p) => {
//   if (p.children.length > 0) {
//     return {
//       href: `${p.children[0].href}`,
//       name: `${p.children[0].innerText}`,
//     };
//   } else {
//     return {
//       href: ``,
//       name: `${p.innerText}`,
//     };
//   }
// });

//* To filter out the alphabet letters
// const filteredArray = array.filter((obj) => {
//   return obj.href !== 'undefined';
// });
