'use strict';

const debug = require('debug')('auth:error-handler');
// const errorMsg = require('debug')('auth:error-handler');
const httpErrors = require('http-errors');

module.exports = exports = function(err, req, res, next) {
  console.error(err.message);
  if (err.status && err.name) {
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = httpErrors(500, err.message);
  res.status(err.status).send(err.name);
};