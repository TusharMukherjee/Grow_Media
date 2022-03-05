const {UsersModel} = require('../../sqlDB/models/users');
const {BlogsModel} = require('../../sqlDB/models/blogsModel');
const {BlogCommentsModel} = require('../../sqlDB/models/blogsComments');
const {replyCommentModel} = require('../../sqlDB/models/replyComments');
const {BlogLikesModel} = require('../../sqlDB/models/blogsLikes');
const {FriendsModel} = require('../../sqlDB/models/friends');
const { raw } = require('objection');

const resolvers = {
    Query: {

        userAuthenticationCheck(parent, args){
            // const {username, password} = args
            return UsersModel.query().where('username', args.username).whereRaw(`BINARY 'password' = '${args.password}'`);
        },
        // give array info to check auth
        users(){
            return UsersModel.query(); /* Resolve all users  */
        },
        user(parent, args){
            return UsersModel.query().withGraphFetched('blogs').where('user_id','=',args.id);
        }, /* Resolve Blogs of a particular user */
        searchUser(parent, args){
            return UsersModel.query().where('username', 'LIKE', `%${args.searchkeyword}%`);
        }, /* search user with keyword "normal sql like function used" */
        blog(parent, args){
            return BlogsModel.query().where('blog_id','=',args.id).withGraphFetched('[users,bcomments.[blogsComUsers,replyComments.[replyUsers]]]');
        }, /* Resolve A blog fully with comments and replied comments */
        onlycomments(parent, args){
            return BlogsModel.query().where('blog_id','=',args.id).withGraphFetched('[bcomments.[blogsComUsers,replyComments.[replyUsers]]]');
        },
        blogs(){
            return BlogsModel.query().withGraphFetched('users').modifyGraph('users', whereUser => { whereUser.select('user_id', 'profile_img', 'username') });
        }, /* Resolves all blogs of a particular user "HOMEPAGE OF A USER" */
        searchBlog(parent, args){
            return BlogsModel.query().where('heading', 'LIKE', `%${args.searchkeyword}%`).orWhere('content', 'LIKE', `%${args.searchkeyword}%`);
        },/* Search a blog with keyword matching word in blog heading or content */
        checksomeone_followers(parent, args){
            return FriendsModel.query().select('uUser_id').where('followers_id',args.user_id).withGraphFetched('friendsUsers');
        },/* Resolve and show someones followers using users ID */
        checksomeone_following(parent, args){
            return FriendsModel.query().select('followers_id').where('uUser_id',args.user_id).withGraphFetched('friendsFollowers');
        },/* Resolves and shows someone following using users ID */
        imgname(){
            const imgLink = "http://localhost:3001/uploads/269150.jpg";
            return {"img":imgLink};
        }
    },
// UsersModel.query().select('followers_id').where('uUser_id',args.user_id).withGraphFetched('blogs');

    Mutation: {
        createUser: async (parent, args) => {
            const newUser = args.input;
            await UsersModel.query().insert(newUser);
            console.log(newUser);
            return newUser;
        },
        updateUser: async (parent, args) => {
            const updUser = args.input;
            await UsersModel.query().patch({"username": updUser.username, "bio": updUser.bio, "link": updUser.link}).where('user_id', args.input.user_id);
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
            return BlogsModel.query().delete().where('bluser_id',args.user_id).where('blog_id',args.blog_id);
        },



        likeBlog: async (parents,args) => {
            const isExist = BlogLikesModel.query().where('bluser_id',args.user_id).where('blblog_id',args.blog_id);
            let value;
            if (!((await isExist).length)){
                value = true;
                console.log(value, "in if, not liked inserting");
                await BlogLikesModel.query().insert({"bluser_id": args.user_id, "blblog_id": args.blog_id});
                return await BlogLikesModel.query()
            }
            else{
                value = false;
                console.log(value, "in else, already liked");
                return BlogLikesModel.query();
            }
        },
        
        unlikeBlog: async (parents,args) => {
            const isExist = BlogLikesModel.query().where('bluser_id',args.user_id).where('blblog_id',args.blog_id);
            if ((await isExist).length){
                console.log("deleted like");
                await BlogLikesModel.query().delete().where('bluser_id',args.user_id).where('blblog_id',args.blog_id);
            }
            return await BlogLikesModel.query();
        },

        commentBlog: async (parent,args) => {
            return BlogCommentsModel.query().insert({"bluser_id": args.user_id, "blblog_id":args.blog_id, "blcomment":args.commentContent});
        },
        deleteComment: async (parents,args) => {
            return BlogCommentsModel.query().delete().where('bluser_id',args.user_id).where('blblog_id',args.blog_id).where('bcomment_id',args.bcomment_id);
        },
        replyComm: async (parent,args) => {
            return await replyCommentModel.query().insert({"replyUser_id": args.user_id, "parentComment_id": args.parentComment_id, "replied_comment": args.commentContent});
        },
        deleteReplyComment: async (parents,args) => {
            return BlogCommentsModel.query().delete().where('rcomment_id',args.rcomment_id).where('replyUser_id',args.user_id).where('parentComment_id',args.parentComment_id);
        },


        toFollow: async (parent, args) => {
            const isExist = FriendsModel.query().whereExists(FriendsModel.query().whereRaw('uUser',args.user_id, 'AND', 'followers_id', args.followers_id));
            if(!(await isExist.length)){
                await FriendsModel.query().insert({"uUser_id": args.user_id, "followers_id": args.followers_id});
            }
            return FriendsModel.query();
        },
        toUnfollow: async (parent, args) => {
                await FriendsModel.query().delete().where('uUser_id',[args.user_id]).where('followers_id', [args.followers_id]);
            return FriendsModel.query();
        }
    }
}

module.exports = {resolvers}