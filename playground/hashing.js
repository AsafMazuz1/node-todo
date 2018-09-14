const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

/*
bcrypt.genSalt(10 , (err, salt) =>{
	bcrypt.hash(password , salt , (err , hash) =>{
		console.log(hash);
	});
});
*/
var hashPassword = '$2a$10$C5ngIUnwP37MQML11sN66.z.j5NZfHRG17q5Aihw5H95cKncz9u6S';

bcrypt.compare(password , hashPassword, (err , res) => {
	console.log(res);
});


/*
var data = {
	id: 10
};

var token = jwt.sign(data , '123abc');

console.log('token', token);

var decoded = jwt.verify(token , '123abc');
console.log('decided', decoded);


var message = "I am user 3";
var hash = SHA256(message).toString();

console.log(`Meesage: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
	id: 4
};

var token = {
	data,
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();

if(resultHash === token.hash){
	console.log('Data was not changed');
}else{
	console.log('Data was changed');
}
*/