// Model is use to connect database tables through Objection ORM
const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');


const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class UsersModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings () {
    return {
      blogs: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname,'./blogsModel.js'),
        join: {
          from: 'users.user_id',
          to: 'blogs.bluser_id'
        }
      },


      usersReply: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, './replyComments'),
        join: {
          from: 'users.user_id',
          to: 'rcomments.replyUser_id'
        }
      },


      usersFollowers: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, './friends'),
        join: {
          from: 'users.user_id',
          to: 'friends.followers_id'
        }
      },


      usersFollowing: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, './friends'),
        join: {
          from: 'users.user_id',
          to: 'friends.uUser_id'
        }
      },


      usersExtraInfo: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, './extraInfo'),
        join: {
          from: 'users.user_id',
          to: 'extraInfo.bluser_id'
        }
      },


      usersBlogsLikes: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, './blogsLikes'),
        join: {
          from: 'users.user_id',
          to: 'blikes.bluser_id'
        }
      },


      usersBlogsCom: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, './blogsComments'),
        join: {
          from: 'users.user_id',
          to: 'bcomments.bluser_id'
        }
      }

    }
  }
}


// table name 'users'
module.exports = {UsersModel};