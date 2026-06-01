const healthService = require('../services/health.service');
const apiResponse = require('../utils/api-response');

function getHealth(req, res) {
  const data = healthService.getHealthData();
  return res.status(200).json(apiResponse.success(data, 'Server is healthy'));
}

module.exports = {
  getHealth
};
