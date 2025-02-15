const TaskList = require('../models/TaskList');

exports.createTaskList = async (req, res) => { 
	const { title, description, priority } = req.body;
	const taskList = new TaskList({
		title,
		description,
		priority
	});
	try {
		const result = await taskList.save();
		res.status(201).json(result);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}