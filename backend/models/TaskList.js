const moongose = require('mongoose');
const Schema = moongose.Schema;

const taskListSchema = new Schema({
		title: String,
		description:String,
		priority: String,
		createdAt: {
			type: Date,
			default: Date.now
		},	
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}

});

module.exports = moongose.model('TaskList', taskListSchema);