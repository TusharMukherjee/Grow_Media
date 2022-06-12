const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');

const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class bCommentLikesModel extends Model {
    static get tableName(){
        return 'bcommentLikes';
    }

    static get relationMappings(){
        return {
            bCommentLikeUser:{
                relation: Model.HasManyRelation,
                modelClass: path.join(__dirname, './users'),
                join: {
                    from: 'bcommentLikes.bluser_id',
                    to:'users.user_id'
                }
            },

            bcommentLikesb:{
                relation: Model.HasOneRelation,
                modelClass: path.join(__dirname, './blogsComments'),
                join: {
                    from: 'bcommentLikes.bcomment_idLike',
                    to:'bcomments.bcomment_id'
                }
            }
        }
    }
}

module.exports = { bCommentLikesModel };