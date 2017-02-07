//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

//Object Destructuring
// var user = {name: 'andrew', age: 25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert to do', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2)); //ops - inserts all the docs
  // });

  //
  db.collection('Users').insertOne({
    name: 'Ashok Tulachan',
    age: 28,
    location: 'Round Hill, VA'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert to do', err);
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)); //ops - inserts all the docs
  });
  db.close();
});
