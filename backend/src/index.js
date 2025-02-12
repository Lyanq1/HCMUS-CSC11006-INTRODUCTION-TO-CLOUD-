const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to the server at port 5000');
});
app.listen(process.env.PORT || 5000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
