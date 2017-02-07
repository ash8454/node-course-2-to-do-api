const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//Find and Update
// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('58993d41c83a474644edea97')
// }, {
//   $set: {
//     completed: true
//   }
// }, {
//   returnOriginal: false //return updated one
// }).then((result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5899452f5f624859ec043ce3')
}, {
  $set: {
    name: 'Ashok Tulachan',
  },
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false //return updated one
}).then((result) => {
  console.log(result);
});


  //db.close();
});
