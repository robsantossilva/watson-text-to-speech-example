const knex = require('knex');
let config = require('../../knexfile');

const env = process.env.NODE_ENV;
config = env == 'test' ? config.test : config.development;

console.log('NODE_ENV: '+ env);

const connection = knex(config);

module.exports = connection;