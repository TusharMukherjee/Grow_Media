const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class BlogCommentsModel extends Model {
    static get tableName() {
      return 'bcomments';
    }
  
    static get relationMappings () {
      return {
        blogsComUsers: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './users'),
          join: {
            from: 'bcomments.bluser_id',
            to: 'users.user_id'
          }
        },


        blogsCom: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './blogsModel'),
          join: {
            from: 'bcomments.blblog_id',
            to: 'blogs.blog_id'
          }
        },

        
        replyComments: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './replyComments'),
          join: {
            from: 'bcomments.bcomment_id',
            to: 'rcomments.parentComment_id'
          }
        }
      }
    }
  
}

module.exports = { BlogCommentsModel };