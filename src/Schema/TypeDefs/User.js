const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        user_id: {type: GraphQLID},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        bio: {type: GraphQLString},
        link: {type: GraphQLString},
    }),
});

const BLogType = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        heading: {type:GraphQLString},
        content: {type: GraphQLString}
    }),
})

// const getAll = new GraphQLObjectType({
//     name: 'getAllType',
//     fields: () => ({
//         users: UserType,
//         blogs: BLogType
//     }),
// });



module.exports = {UserType, BLogType};