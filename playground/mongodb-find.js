//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) =>{
	if(err){
		return console.log('Error connecting to db');
	}
	console.log('Connected to the DB');

	/*db.collection('Todos').find().count().then((count) => {
		console.log('Todos');
		console.log(`Todos Count: ${count}`);
	}, (err) =>{
		console.log('Error loading data' , err);
	});*/

	db.collection('Users').find({name: 'Asaf Mazuz'}).toArray().then((docs) => {
		console.log('Users');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) =>{
		console.log('Error loading data' , err);
	});

	//db.close();
})