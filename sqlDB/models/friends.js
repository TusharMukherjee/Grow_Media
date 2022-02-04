const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class FriendsModel extends Model {
    static get tableName() {
      return 'friends';
    }
  
    static get relationMappings () {
      return {
        friendsUsers: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './users'),
          join: {
            from: 'friends.uUser_id',
            to: 'users.user_id'
          }
        },


        friendsFollowers: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './users'),
          join: {
            from: 'friends.followers_id',
            to: 'users.user_id'
          }
        },

      }
    }
  
}

module.exports = { FriendsModel };