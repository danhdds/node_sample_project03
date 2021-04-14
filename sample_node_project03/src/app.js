const express = require('express');
const path = require('path');
const bootstrap = require('./bootstrap');
const cors = require('cors');

const app = express();

// set template engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '/views'));

// requesting parsing
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

var corsOptions = {
    origin: "http://localhost:5001"
};

// set cors middlewares
app.use(cors(corsOptions));

// create express router
const router = express.Router();
app.use(router);

bootstrap(app, router);