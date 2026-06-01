const env = require('./src/config/env');

module.exports = {
  development: {
    client: 'mysql2',
    connection: env.databaseUrl,
    migrations: {
      directory: './src/db/migrations'
    }
  }
};
