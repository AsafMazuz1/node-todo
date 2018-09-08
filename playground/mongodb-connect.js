//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) =>{
	if(err){
		return console.log('Error connecting to db');
	}
	console.log('Connected to the DB');

	/*db.collection('Todos').insertOne({
		text: 'Something to do',
		completed: false

	} , (err , result) =>{
		if(err){
			return console.log('Unable to insert todo' , err);
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
	});

	db.collection('Users').insertOne({
		name: 'Asaf Mazuz',
		age: 25,
		location: 'Modiin 66, Israel'

	} , (err , result) =>{
		if(err){
			return console.log('Unable to insert user' , err);
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	});*/

	db.close();
})