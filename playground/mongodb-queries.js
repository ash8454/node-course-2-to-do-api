const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '5899495d24632a165aa20aea';
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// //Find the first one
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos', todo);
// });
//
// //Find by id
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

//Users
var userId = '5899535076c627705a86c4d4';
User.findById(userId).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log('User by ID', user);
}).catch((e) => console.log(e));
