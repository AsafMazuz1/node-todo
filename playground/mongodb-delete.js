//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) =>{
	if(err){
		return console.log('Error connecting to db');
	}
	console.log('Connected to the DB');
/*
	db.collection('Todos').deleteMany({text: 'Something to do'}).then((result)=>{
		console.log(result);
	});

	db.collection('Todos').deleteOne({text: 'Build App'}).then((result)=>{
		console.log(result);
	});

	db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
		console.log(result);
	});
*/

	db.collection('Users').findOneAndDelete({_id: new ObjectID('5b93bf6fdf78a3fba7829a02')}).then((result) =>{
		console.log(result);
	});
	//db.close();
})