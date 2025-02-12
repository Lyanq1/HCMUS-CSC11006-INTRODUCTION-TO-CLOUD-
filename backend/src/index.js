const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});