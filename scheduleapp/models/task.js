var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var TaskSchema = new Schema({
	title: String,
	date: {
		day: String,
		month: String,
		year : String
	},
	description: String
});
module.exports = mongoose.model('task', TaskSchema);