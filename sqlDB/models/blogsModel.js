const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class BlogsModel extends Model {
    static get tableName() {
      return 'blogs';
    }
  
    static get relationMappings () {
      return {
        users: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './users'),
          join: {
            from: 'blogs.buser_id',
            to: 'users.user_id'
          }
        },

        blikes: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './blogsLikes'),
          join: {
            from: 'blikes.blblog_id',
            to: 'blogs.blog_id'
          }
        },

        bcomments: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './blogsComments'),
          join: {
            from: 'blogs.blog_id',
            to: 'bcomments.blblog_id'
          }
        }
      }
    }
  
}

module.exports = { BlogsModel };