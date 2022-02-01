// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'test_app',
      user:     'root',
      password: 'qwertyMYSQLtushar10!'
    },
    migrations:{
      directory: './sqlDB/migration'
    },
    seeds:{
      directory: './sqlDB/seeds'
    }
  }
};
