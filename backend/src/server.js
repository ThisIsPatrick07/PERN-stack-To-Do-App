require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || '3000';
const tasksRoutes = require('./routes.js');

// remove later
const controller = require('./controller.js');

// middleware to handle json data
app.use(express.json());

// routing for tasks
app.use('/api/tasks/', tasksRoutes);

// create table
app.get('/setup', controller.setupDatabase);

app.listen(port, () => { console.log(`App is now listening on port: ${port}`) });