// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { dummyInsert } = require('./controller.js');
const tasksRoutes = require('./routes.js');

app.use(express.json());

// Endpoint to set up the database and insert initial data
app.get('/api/setup', (req, res) => {
	dummyInsert(req, res);
});

// Endpoint for tasks routes
app.use('/api/tasks', tasksRoutes);

app.listen(port, () => {
    console.log(`App is now listening on port: ${port}`);
});
