const {UsersModel} = require('../../sqlDB/models/users');
const {BlogsModel} = require('../../sqlDB/models/blogsModel');
const {BlogCommentsModel} = require('../../sqlDB/models/blogsComments');
const {replyCommentModel} = require('../../sqlDB/models/replyComments');
const {BlogLikesModel} = require('../../sqlDB/models/blogsLikes');
const {FriendsModel} = require('../../sqlDB/models/friends');

const resolvers = {
    Query: {
        users(){
            return UsersModel.query();
        },
        user(parent, args){
            return UsersModel.query().withGraphFetched('blogs').where('user_id','=',args.id);
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


    User: {
        blogs: async(parent) => {
            return
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


        createBlog: async (parent, args) => {
            return BlogsModel.query().insert({"bluser_id": args.user_id, "b_immage": args.b_immage,"heading": args.heading, "content": args.content});
        },
        deleteBlog: async(parent,args) => {
            return BlogsModel.query().delete().whereExists(BlogsModel.query().whereRaw('bluser_id',args.user_id,'AND','blog_id',args.blog_id));
        },



        likeBlog: async (parents,args) => {
            return BlogLikesModel.query().insert({"bluser_id": args.user_id,"blblog_id": args.blog_id});
        },
        unlikeBlog: async (parents,args) => {
            return BlogLikesModel.query().delete().where('bluser_id',args.user_id,'AND', 'blblog_id',args.blog_id);
        },
        commentBlog: async (parent,args) => {
            return BlogCommentsModel.query().insert({"bluser_id": args.user_id, "blblog_id":args.blog_id, "blcomment":args.commentContent});
        },
        deleteComment: async (parents,args) => {
            return BlogCommentsModel.query().delete().where('bluser_id',args.user_id,'AND', 'blblog_id',args.blog_id);
        },
        replyComm: async (parent,args) => {
            return await replyCommentModel.query().insert({"bluser_id": args.user_id, "blblog_id":args.blog_id, "parentComment_id": args.parentComment_id, "replied_comment": args.commentContent});
        },
        deleteReplyComment: async (parents,args) => {
            return BlogCommentsModel.query().delete().where('bluser_id',args.user_id,'AND', 'blblog_id',args.blog_id,'AND', 'parentComment_id',args.parentComment_id);
        },


        toFollow: async (parent, args) => {
            return FriendsModel.query().insert({"uUser_id": args.user_id, "followers_id": args.followers_id});
        },
        toUnFollow: async (parent, args) => {
            return FriendsModel.query().delete().whereExists(FriendsModel.query().whereRaw('uUser',args.user_id, 'AND', 'followers_id', args.followers_id));
        }
    }
}

module.exports = {resolvers}