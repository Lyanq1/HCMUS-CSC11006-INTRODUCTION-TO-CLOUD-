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

exports.getTaskList = async (req, res) => { 
	
	try {
		const taskList = await TaskList.find();
		res.status(200).json(taskList);
		console.log(taskList);	
		
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

exports.updateTaskList = async (req, res) => { 
	try {
		const {id} = req.params;
		const data = req.body;
		const result = await TaskList.findByIdAndUpdate(id, {$set: data}, {returnOriginal: false});
		console.log(result);
		res.send({message:'Task updated successfully'});
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
}

exports.deleteTaskList = async (req, res) => {
	try {
		const {id} = req.params;
		const result = await TaskList.findByIdAndDelete(id);
		console.log(result);
		res.send({message:'Task deleted successfully'});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}
 