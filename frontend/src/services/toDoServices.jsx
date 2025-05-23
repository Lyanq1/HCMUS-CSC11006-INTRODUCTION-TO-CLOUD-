import axios from 'axios';

const SERVER_URL = 'http://localhost:80/api/task';

const createTask =  (task) => {
	return axios.post(`${SERVER_URL}/create-task`, task);
}

const getTask =  () => {
	return axios.get(`${SERVER_URL}/get-task`);
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