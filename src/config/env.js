const dotenv = require('dotenv');

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 5001,
  nodeEnv: process.env.NODE_ENV || 'development'
};

module.exports = env;
