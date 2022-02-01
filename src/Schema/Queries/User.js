const { GraphQLObjectType,GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const { UserType, BLogType } = require('../TypeDefs/User');
const { Users, Blogs } = require('../../../sqlDB/models/users');


// const RootQueryType =  {
//     type: new GraphQLObjectType({
//     name: 'getAllType',
//     fields:()=>({
//         users:{
//             type: new GraphQLList(UserType),
//             resolve:() => {
//                 return Users.query();
//             }
//         }
//     })
// })};

const getAllUser = {
    type: new GraphQLList(UserType),
    resolve(){
        return Users.query();
    }
}


// not able to tranfer args to other file 
// const getUserWithPost = {
//     type: new GraphQLList(BLogType),
//     args:{
//         id: { type: GraphQLID}
//     },
//     resolve(parent, args){
//         return Blogs.query().where('buser_id',`${args.id}`);
//         // return Users.query().withGraphFetched('blogs').where('user_id','=',`${args.id}`);
//     }
// }

module.exports = { getAllUser};