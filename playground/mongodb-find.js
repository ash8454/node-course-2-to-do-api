const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  // db.collection('Todos').find({
  //   _id: new ObjectID('58993647c83a474644ede8f2')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  //Count
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  //Select Query
  db.collection('Users').find({name: 'Ashok Tulachan'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Users', err);
  });


  //db.close();
});
