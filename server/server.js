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


require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//Post /todos
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

//GET /todos/
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});


//GET /todos/123423
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Validate id using isValid
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  }

  //findById
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => res.status(400).send({}));

});


//DELETE
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Validate id using isValid
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  }

  //findById
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => res.status(400).send());
})


//PATCH
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed'])

  //Validate id using isValid
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});


//POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body);

    user.save().then((user) => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    });
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});




module.exports = {app};
