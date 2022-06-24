// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'test_app',
      user:     'root',
      password: process.env.MYSQLPASS
    },
    migrations:{
      directory: './sqlDB/migration'
    },
    seeds:{
      directory: './sqlDB/seeds'
    }
  }
};
