var mongoose = require('mongoose');

const options = {
  useNewUrlParser: true 
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI , options );

module.exports = {
	mongoose
};