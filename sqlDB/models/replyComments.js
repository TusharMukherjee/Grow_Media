const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class replyCommentModel extends Model {
    static get tableName() {
      return 'rcomments';
    }
  
    static get relationMappings () {
      return {
        replyUsers: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './users'),
          join: {
            from: 'rcomments.replyUser_id',
            to: 'users.user_id'
          }
        },


        replyComments: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './blogsComents'),
          join: {
            from: 'rcomments.parentComment_id',
            to: 'bcomments.bcomment_id'
          }
        }
      }
    }
  
}

module.exports = { replyCommentModel };