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
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3200;

app.use(bodyParser.json());

//Post /todos
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

//GET /todos/
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});


//GET /todos/123423
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  //Validate id using isValid
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  }

  //findById
  // Todo.findById(id).then((todo) => {
  //   if (!todo) {
  //     return res.status(404).send();
  //   }
  //   res.send({todo})
  // }).catch((e) => res.status(400).send({}));

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => res.status(400).send({}));

});


//DELETE
app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  //Validate id using isValid
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  }

  //findById
  // Todo.findByIdAndRemove(id).then((todo) => {
  //   if (!todo) {
  //     return res.status(404).send();
  //   }
  //   res.send({todo})
  // }).catch((e) => res.status(400).send());

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => res.status(400).send());
})


//PATCH
app.patch('/todos/:id', authenticate, (req, res) => {
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

  // Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
  //   if (!todo) {
  //     return res.status(404).send();
  //   }
  //   res.send({todo});
  // }).catch((e) => {
  //   res.status(400).send();
  // })

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
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

// var authenticate = (req, res, next) => {
//   var token = req.header('x-auth');
//
//   User.findByToken(token).then((user) => {
//     if (!user) {
//       return Promise.reject();
//     }
//     req.user = user;
//     req.token = token;
//     next();
//   }).catch((e) => {
//     res.status(401).send();
//   });
// }

app.get('/users/me', authenticate, (req, res) => {
  // var token = req.header('x-auth');
  //
  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     return Promise.reject();
  //   }
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send();
  // });
  res.send(req.user);
})


// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
    //res.send(user);
  }).catch((e) => {
    res.status(400).send();
  });
  //res.send(body);
});


app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
