// var mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
// var {mongoose} = require('./db/mongoose');


// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
//
// newTodo.save().then((doc) => {
//   console.log('Saved to do', doc);
// }, (e) => {
//   console.log('Unable to save todo')
// });


// var otherTodo = new Todo({
//   text: 'Feed the dog',
//   completed: true,
//   completedAt: 0
// });

// var otherTodo = new Todo({
//   text: 'Edit this video',
//   // completed: true,
//   // completedAt: 0
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });


// var User = mongoose.model('User', {
//   email: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   }
// });
//
// var user = new User({
//   email: ' tulachanashok@gmail.com  '
// });
//
// user.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });

//Resource Creation End Point - Section 7 Lecture 73
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

//GET /todos/123adfa

app.listen(3000, () => {
  console.log('Started on port 3000');
});
