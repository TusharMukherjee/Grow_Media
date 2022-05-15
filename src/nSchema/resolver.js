const {UsersModel} = require('../../sqlDB/models/users');
const {BlogsModel} = require('../../sqlDB/models/blogsModel');
const {BlogCommentsModel} = require('../../sqlDB/models/blogsComments');
const {replyCommentModel} = require('../../sqlDB/models/replyComments');
const {BlogLikesModel} = require('../../sqlDB/models/blogsLikes');
const {FriendsModel} = require('../../sqlDB/models/friends');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('../isAuth');
const { ExtraInfoModel } = require('../../sqlDB/models/extraInfo');
const {cloudinary} = require('../cloudinary');

const salt = bcrypt.genSaltSync(10);

const jwtToken = (value) =>  {
    const giveToken = jwt.sign({"user_id": value},
                        `tKBw+m]$#VC"&P3_Lq:u`, { expiresIn: '1d' })
    return giveToken;
    
}


const verifyjwtFunc = (jwtAToken) => {
    jwt.verify(jwtAToken, `tKBw+m]$#VC"&P3_Lq:u`, function(err, decode){
        if(decode){
            return decode;
        }
        else{
            return err;
        }
    });
}

const resolvers = {
    Query: {
        verifyjwtFunc(parent,args, {req,checkContext}){
            return ({"user_id":checkContext(req)})

            // const verifyjwt = verifyjwtFunc(token);
            // return {"user_id":verifyjwt.user_id};
        },
        users(){
            return UsersModel.query(); /* Resolve all users  */
        },
        user(parent, args){
            return UsersModel.query().withGraphFetched('blogs').where('user_id','=',args.id);
        }, /* Resolve Blogs of a particular user */
        searchUser(parent, args){
            return UsersModel.query().where('username', 'LIKE', `%${args.searchkeyword}%`);
        }, /* search user with keyword "normal sql like function used" */
        // homeUser(parent,args){
        //     return UsersModel.query().where('user_id',args.id);
        // },
        blog(parent, args){
            return BlogsModel.query().where('blog_id','=',args.id).withGraphFetched('[users,bcomments.[blogsComUsers,replyComments.[replyUsers]]]');
        }, /* Resolve A blog fully with comments and replied comments */
        onlycomments(parent, args){
            return BlogsModel.query().where('blog_id','=',args.id).withGraphFetched('[bcomments.[blogsComUsers,replyComments.[replyUsers]]]');
        },
        blogs(){
            return BlogsModel.query().withGraphFetched('users').modifyGraph('users', whereUser => { whereUser.select('user_id', 'profile_img', 'username') });
        }, /* Resolves all blogs of a particular user "HOMEPAGE OF A USER" */
        homeBlogs(parent,args){
            return BlogsModel.query().where('bluser_id',args.id);
        },
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
        },

        async infoquery(_,args){
            const allInfo = await UsersModel.query().where('user_id',args.id).withGraphFetched('usersExtraInfo');
            console.log(allInfo);
            return allInfo;
        }

    },
// UsersModel.query().select('followers_id').contextwhere('uUser_id',args.user_id).withGraphFetched('blogs');

    Mutation: {

        

        async logout(_,__,{res}){
            res.cookie("aces_token",'', {maxAge: 1, httpOnly:true});
            return true;
        }, //DONE

        async userAuthenticationCheck(parent, args,{ res }){

            const usersblog = await UsersModel.query().where('username', args.username);
            const userAuthPass = usersblog[0].password;
            console.log("called");

            let resultBcrypt = await bcrypt.compare(args.password, userAuthPass);
            console.log(resultBcrypt);

            const jwtAccessToken = jwtToken(usersblog[0].user_id);
            // console.log(jwtToken(usersblog[0].user_id))
            // const token = req.cookie.jwtAccessToken;
            // console.log(token);
            // const verifyjwt = verifyjwtFunc(token);

            if(resultBcrypt){
                res.cookie("aces_token",jwtAccessToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly:true});
                // res.cookie("access-token",jwtToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly:true});
                // response.cookie("access-token",jwtToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly:true});
                return (
                    {
                        "user_id": usersblog[0].user_id,
                        "username": usersblog[0].username,
                        "authorized": true,
                        "token": jwtAccessToken
                    }
                )
            }else{
                return({
                    "user_id": usersblog[0].user_id,
                    "username": usersblog[0].username,
                    "authorized": false,
                    "token": null
                })
            }
        }, // DONE
        // give array info to check auth 
        createUser: async (parent, args) => {
            const newUser = args.input;
            const {username, email, password} = newUser;
            const hashPass = await bcrypt.hash(password,salt);
            const newUserHash = {
                username,
                email,
                password:hashPass
            }
            await UsersModel.query().insert(newUserHash);
            // await ExtraInfoModel.query().insert([
            //     {
            //         bluser_id: await UsersModel.query().select(user_id).where('username',newUser.username),
            //         qualification: null,
            //         hometown:null,
            //         work:null,
            //         college:null
            //     }
            // ]);
            // await UsersModel.query().insertGraph({
            //  username,
            //  email,
            //  password:hashPass,

            //  usersExtraInfo:[
            //     {
            //         bluser_id: ,
            //         qualification:null,
            //         hometown:null,
            //         work:null,
            //         college:null
            //     }
            //  ]

            // })
            console.log(newUser);
            console.log(newUserHash);
            return newUser;
        }, // DONE

        updateUser: async (parent, args) => {
            const updUser = args;
            await UsersModel.query().patch({"bio": updUser.bio, "link": updUser.link}).where('user_id', args.user_id);
            const check_ei = await ExtraInfoModel.query().where('bluser_id',args.user_id);
            console.log(updUser);
            console.log(check_ei.length === 0);
            if(check_ei.length === 0){
                await ExtraInfoModel.query().insert({
                    bluser_id: args.user_id,
                    qualification: args.qualification,
                    hometown:args.hometown,
                    work:args.work,
                    college:args.college
                })
                console.log("first")
            }
            else{
                await ExtraInfoModel.query().patch({
                    'qualification': args.qualification,
                    'hometown':args.hometown,
                    'work':args.work,
                    'college':args.college
                }).where('bluser_id',args.user_id);
                console.log("second");
                return true;
            }
            // return updUser;
        },
        deleteUser: async (parent, args) => {
            await UsersModel.query().delete().where('user_id', args.user_id);
            console.log(true);
            return true;
        },

        async blogData(parent, args){
            let {user_id, blog_heading, blog_content, blog_image} = await args;
            const uploadResponse = await cloudinary.uploader.upload(blog_image, {
                    upload_preset: "grow_media",
            });
            await BlogsModel.query().insert({"bluser_id": user_id, "b_image": uploadResponse.public_id+'.'+uploadResponse.format,"heading": blog_heading, "content": blog_content});
            // await UsersModel.relatedQuery('blogs').insert({"bluser_id": user_id, "b_image": uploadResponse.public_id+'.'+uploadResponse.format,"heading": blog_heading, "content": blog_content});
            return {"isUploaded": true};
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