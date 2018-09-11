const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');



const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: '123'
}]

beforeEach((done)=>{
	Todo.remove({}).then(() =>{
		return Todo.insertMany(todos);
		
	}).then(() => done());
});

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
			}).catch((e) => done(e));
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