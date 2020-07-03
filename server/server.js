require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const api_routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cookbook_local', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', api_routes);


app.listen(PORT, console.log('Listening on ' + PORT));