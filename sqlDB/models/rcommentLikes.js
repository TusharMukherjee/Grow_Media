const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');

const knexConnection = Knex(connection.development);
Model.knex(knexConnection);

const path = require('path');

class rCommentLikesModel extends Model {
    static get tableName(){
        return 'rcommentLikes';
    }

    static get relationMappings(){
        return {
            rCommentLikeUser:{
                relation: Model.HasManyRelation,
                modelClass: path.join(__dirname, './users'),
                join: {
                    from: 'rcommentLikes.bluser_id',
                    to:'users.user_id'
                }
            }
        }
    }
}

module.exports = { rCommentLikesModel };