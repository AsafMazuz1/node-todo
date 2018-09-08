//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) =>{
	if(err){
		return console.log('Error connecting to db');
	}
	console.log('Connected to the DB');

/*	db.collection('Todos').findOneAndUpdate({
		_id : new ObjectID('5b93bb04df78a3fba78298bc')
	} , {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) =>{
		console.log(result);
	});

*/
	db.collection('Users').findOneAndUpdate({
		_id : new ObjectID('5b93a26961bdf42d90e0eb4c')
	} , {
		$set: {
			name: 'Update name'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) =>{
		console.log(result);
	});
	//db.close();
})