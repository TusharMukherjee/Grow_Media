const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class BlogLikesModel extends Model {
    static get tableName() {
      return 'blikes';
    }
  
    static get relationMappings () {
      return {
        blogsLikesUsers: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './users'),
          join: {
            from: 'blikes.bluser_id',
            to: 'users.user_id'
          }
        },

        blogsLikesBlogs: {
          relation: Model.HasManyRelation,
          modelClass: path.join(__dirname, './blogsModel'),
          join: {
            from: 'blikes.blblog_id',
            to: 'blogs.blog_id'
          }
        }

      }
    }
  
}

module.exports = { BlogLikesModel };