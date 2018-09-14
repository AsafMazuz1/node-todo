const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');



const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos' , () =>{
	it('should create a new todo' , (done) => {
		var text = 'Test todo text';

		request(app)
		.post('/todos')
		.send({
			text
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err , res) =>{
			if(err){
				return done(err);
			}

			Todo.find().then((todos) =>{
				expect(todos[2].text).toBe(text);
				done();
			}).catch((e) => dnoe(e));
		});
	});

	it('should not create new todo' , (done) => {
		
		request(app)
		.post('/todos')
		.send({})
		.expect(400)		
		.end((err , res) =>{
			if(err){
				return done(err);
			}

			Todo.find().then((todos) =>{
				expect(todos.length).toBe(2);				
				done();
			}).catch((e) => done(e));
		});
	});
});

describe('GET /todos' , () => {

	it('should get all todos' , (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});

});

describe('GET /todos/:id' , () => {

	it('should return todos by id' , (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	
	it('should return 404 if todo not found' , (done) => {
		var id = new ObjectID();
		request(app)
			.get(`/todos/${id.toHexString()}`)
			.expect(404)			
			.end(done);
	});

	it('should return 404 if id not valid' , (done) => {
		var id = new ObjectID();
		request(app)
			.get(`/todos/55${id.toHexString()}`)
			.expect(404)			
			.end(done);
	});
});

describe('DELETE /todos/:id' , () => {

	it('should remove todos by id' , (done) => {
		var hexId = todos[0]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err , res) =>{
				if(err){
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo).toBeFalsy();
					done();
				}).catch((e) =>{
					done(e);
				});
			});
	});

	
	it('should return 404 if todo not found' , (done) => {
		var id = new ObjectID();
		request(app)
			.delete(`/todos/${id.toHexString()}`)
			.expect(404)			
			.end(done);
	});

	it('should return 404 if id not valid' , (done) => {
		var id = new ObjectID();
		request(app)
			.delete(`/todos/55${id.toHexString()}`)
			.expect(404)			
			.end(done);
	});
});


describe('PATCH /todos/:id' , () => {

	it('should update todos by id' , (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
			.patch(`/todos/${hexId}`)
			.send({text:'updated text from test' , completed: true})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
				expect(res.body.todo.completed).toBe(true);
				
			})
			.end((err , res) =>{
				if(err){
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo.text).toEqual('updated text from test');
					done();
				}).catch((e) =>{
					done(e);
				});
			});
	});

	
	it('should clear completedAt' , (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
			.patch(`/todos/${hexId}`)
			.send({text:'updated text from test' , completed: false})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);				
			})
			.end((err , res) =>{
				if(err){
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo.completedAt).toBeFalsy();
					done();
				}).catch((e) =>{
					done(e);
				});
			});
	});

	
});

describe('GET /users/me' , () => {
	it('should return user if authenticate' , (done) => {
			
		request(app)
			.get(`/users/me`)
			.set('x-auth' , users[0].tokens[0].token)				
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
				
			})
			.end(done);
	});

	it('should return 401 if not authenticate' , (done) => {
			
		request(app)
			.get(`/users/me`)
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});				
			})
			.end(done);
	});
});

describe('POST /users' , () => {
	it('should create a user' , (done) => {
		var email = "example@gmail.com";
		var password= "123abc!";
		request(app)
			.post('/users')
			.send({email , password})				
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toBeTruthy();
				expect(res.body._id).toBeTruthy();
				expect(res.body.email).toBe(email);
				
			})
			.end((err) => {
				if(err){
					return done(err);
				}
				User.findOne({email}).then((user) =>{
					expect(user).toBeTruthy();
					expect(user.password).not.toBe(password);
					done();
				});
			});
	});

	it('should return validation errors if not valid' , (done) => {
			
		var email = "example2gmail.com";
		var password= "123";
		request(app)
			.post('/users')
			.send({email , password})				
			.expect(400)			
			.end(done);
	});

	it('should not create user if email in user' , (done) => {
			
		var email = "Asafmazuz@gmail.com";
		var password= "123abc!";
		request(app)
			.post('/users')
			.send({email , password})				
			.expect(400)			
			.end(done);
	});
});