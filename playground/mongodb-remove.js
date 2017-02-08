const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });



//Find the first one
Todo.findOneAndRemove({
  _id: '589ab4eac83a474644edfe3c'
}).then((todo) => {
  console.log('Todos', todo);
});
//
// //Find by id
// Todo.findByIdAndRemove('589ab458c83a474644edfe01').then((todo) => {
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));
