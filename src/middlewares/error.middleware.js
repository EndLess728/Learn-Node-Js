const apiResponse = require('../utils/api-response');

function notFound(req, res) {
  return res.status(404).json(apiResponse.failure('Route not found'));
}

function globalError(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json(apiResponse.failure(message));
}

module.exports = {
  notFound,
  globalError
};
