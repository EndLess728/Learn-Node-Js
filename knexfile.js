const env = require('./src/config/env');

module.exports = {
  development: {
    client: 'pg',
    connection: env.databaseUrl,
    migrations: {
      directory: './src/db/migrations'
    }
  }
};
