const knex = require('knex');
const configuracao = require('../../knexfile');

const env = process.env.NODE_ENV === 'test' ? configuracao.test : configuracao.development;

const connection = knex(env);

module.exports = connection;