const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const TaskListRoutes = require('../routes/TaskListRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/task', TaskListRoutes);

const url = "mongodb://localhost:27017/tasklist";

mongoose.connect(url, {}).then(() => {
	console.log('Connected to the database');
}
).catch(err => {
	console.log('Failed to connect to the database');
	console.log(err);
});



// mongoose.connect(process.env.MONGO_URI).then(() => {
// 	console.log('Connected to the database');
// }
// ).catch(err => {
// 	console.log('Failed to connect to the database');
// 	console.log(err);
// }
// );

app.get('/', (req, res) => {
	res.send('Welcome to the server at port 5000');
});

app.listen(  5000, () => {
	console.log(`Server is running on port ${5000}`);
});
