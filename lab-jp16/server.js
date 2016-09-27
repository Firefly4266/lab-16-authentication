'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('auth:server');
const httpErrors = require('http-errors');

// app modules
const errorHandler = require('./lib/error_handler');

// constant variables
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/auth_dev';
let app = express();

//setup mongo
mongoose.connect(mongoURI);
mongoose.Promise = Promise;

//setup middleware
app.use(morgan('dev'));

// setup routes
app.all('*', function(req, res, next) {
  debug('404 * route');
  const err = httpErrors(404, 'no such route');
  next(err);
});

app.use(errorHandler);


app.use((err, req, res, next) => {
  serverError(err);
  res.status(err.statusCode || 500).json(err.error.message);
});

// Start server
app.listen(port, () => console.log('Server up Port:', port));
module.exports = ('server');