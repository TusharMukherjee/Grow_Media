const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const {createUser, createUserPost} = require('./Mutations/User');
const { UserType, BLogType } = require('./TypeDefs/User');
const { Users, Blogs } = require('../../sqlDB/models/users');
// const { getAllUser } = require('./Queries/User');

const RootQuery= new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        gA: {
            type: new GraphQLList(UserType),
            args: { id: {type: GraphQLID} },
            resolve(parent,args){
                const users = Users.query().where('user_id',args.id);
                return {
                    users
                };
            }
        },
        gB: {
            type: new GraphQLList(BLogType),
            args: { id: {type: GraphQLID} },
            resolve(parent,args){
                const blogs = Blogs.query().where('buser_id', args.id);
                return blogs
            }
        }
    }   
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        cUser: createUser,
        cUPost: createUserPost
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});