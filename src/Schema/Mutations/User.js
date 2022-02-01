const { GraphQLString } = require('graphql');
const { UserType } = require('../TypeDefs/User');
const { Users, Blogs } = require('../../../sqlDB/models/users');

const createUser = {
    type: UserType,
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(parent, args){
        const {username, email, password} = args;
        await Users.query().insert({username,email,password});
        return args;
    },
}

const createUserPost = {
    type: UserType,
    args: {
        heading: { type: GraphQLString },
        content: { type: GraphQLString }
    },
    async resolve(parent, args){
        const { heading, content } = args;
        await Blogs.query().insert({heading,content});
        return args;
    }
}

module.exports = {createUser,createUserPost};