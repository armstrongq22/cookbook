require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const api_routes = require('./routes/api');
const auth_routes = require('./routes/auth');
const passport = require('./passport/passport')

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cookbook_local', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', api_routes);
app.use('/auth', auth_routes);


app.listen(PORT, console.log('Listening on ' + PORT));