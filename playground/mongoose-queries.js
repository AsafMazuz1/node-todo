const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


/*
var id = '5b95956be10e5a3b2cc446801';

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}


Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos' , todos);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo' , todo);
});
x
Todo.findById(id).then((todo) => {
	if(!todo){
		return console.log('ID not found');
	}
	console.log('Todo By Id' , todo);
}).catch((e) => console.log(e));
*/

var id = '5b944dc79eb56a37586b7c1c';

User.findById(id).then((user) => {
	if(!user){
		return console.log('ID not found');
	}
	console.log('User By Id' , user);
}).catch((e) => console.log(e));