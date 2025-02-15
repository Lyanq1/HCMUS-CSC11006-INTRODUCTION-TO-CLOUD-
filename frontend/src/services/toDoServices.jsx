import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/api/task';

const createTask =  (task) => {
	return axios.post(`${SERVER_URL}/create-task`, task);
}

const getTask =  (id) => {
	return axios.get(`${SERVER_URL}/get-task/${id}`);
}

const deleteTask =  (id) => {
	return axios.delete(`${SERVER_URL}/delete-task/${id}`);
}

const updateTask =  (id,task) => {
	return axios.patch(`${SERVER_URL}/update-task/${id}`, task);
}

const toDoServices = {
	createTask,
	getTask,
	deleteTask,
	updateTask
}

export default toDoServices;