const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class ExtraInfoModel extends Model {
    static get tableName() {
      return 'extraInfo';
    }
  
    static get relationMappings () {
      return {
        extraInfoUsers: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './users'),
          join: {
            from: 'extraInfo.bluser_id',
            to: 'users.user_id'
          }
        }
      }
    }
  
}

module.exports = { ExtraInfoModel };