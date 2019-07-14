'use strict';
const { SERVER_APP_ROOT_REL } = require('../src/constants');
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');
const path = require('path');

require('dotenv').config();

const app = express();

// mongodb connection
const url = process.env.ATLAS_URI;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex  : true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection has been established successfully');
})

app.use('/', express.static(path.join(__dirname, '../build')));
app.use(cors());
app.use(express.json());

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));

// app.use('/.netlify/functions/server', router); 

app.use(`${SERVER_APP_ROOT_REL}/exercises`, exercisesRouter);
app.use(`${SERVER_APP_ROOT_REL}/users`, usersRouter);

module.exports = app;
module.exports.handler = serverless(app);
