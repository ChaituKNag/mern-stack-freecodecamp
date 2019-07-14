const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

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

// routes
app.use('/api/exercises', exercisesRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
    console.info(`Server is running on port: ${port}`);
})