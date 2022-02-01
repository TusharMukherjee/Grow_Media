const {UsersModel} = require('../../sqlDB/models/users');
const {BlogsModel} = require('../../sqlDB/models/blogsModel');
const {BlogCommentsModel} = require('../../sqlDB/models/blogsComments');
const {replyCommentModel} = require('../../sqlDB/models/replyComments');

const resolvers = {
    Query: {
        users(){
            return UsersModel.query();
        },
        user(parent, args){
            return UsersModel.query().withGraphFetched('blogs').where('user_id','=',args.id);
        },
        search(parent, args){ // cancel this function 
            return this.search;
            // const searchVar = args.searchString;
            // const searchNotSensitive = searchVar.toLowerCase();
            // const searchedBlogs = BlogsModel.query().where('heading','like', `%${searchNotSensitive}%`, 'OR', 'content','like', `%${searchNotSensitive}%`);
            // const searchedUsers = UsersModel.query().where('username', 'like', `%${searchNotSensitive}%`);
            // return {
            //     searchedBlogs, searchedUsers
            // }
        },
        blog(parent, args){
            return BlogsModel.query()
                                       .withGraphFetched('[blogs, bcomments.replyComments]')
                                       .modifyGraph('blogs', findBlog => { findBlog.where('blog_id','=',args.id) });
        },
        blogs(){
            return Blogs.query();
        },
        imgname(){
            const imgLink = "http://localhost:3001/uploads/269150.jpg";
            return {"img":imgLink};
        }
    },


    Mutation: {
        createUser: async (parent, args) => {
            const newUser = args.input;
            await UsersModel.query().insert(newUser);
            console.log(newUser);
            return newUser;
        },
        updateUser: async (parent, args) => {
            const updUser = args.input;
            await UsersModel.query().patch({"username": updUser.username}).where('user_id', args.input.user_id);
            console.log(updUser);
            return updUser;
        },
        deleteUser: async (parent, args) => {
            const updUser = args.input;
            await UsersModel.query().delete().where('user_id', args.input.user_id);
            console.log(updUser);
            return updUser;
        },

        likeBlog: async (parents,args) => {

        }
    }
}

module.exports = {resolvers}