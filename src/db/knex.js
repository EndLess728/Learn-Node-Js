const knex = require('knex');
const knexConfig = require('../../knexfile');
const env = require('../config/env');

const db = knex(knexConfig[env.nodeEnv] || knexConfig.development);

module.exports = db;
