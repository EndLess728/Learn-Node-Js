const dotenv = require('dotenv');

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/learning_node'
};

module.exports = env;
