const {gql} = require('apollo-server-express');
// "users" defined in resolvers, but not in schema
const typeDefs = gql`

    type imgname{
        img: String!
    }
    
    type Users{
        user_id: ID
        profileImg: String
        username: String
        email: String
        password: String
        bio: String
        link: String
    }

    type User{
        user_id: ID
        profile_img: String
        username: String
        email: String
        password: String
        bio: String
        link: String
        blogs: [Blogs] # to be parent
        skills: [extraInfo] # to be parent
    }

    type numberOfBlogs{
        numberOfBlogs: Int
    }

    type toFollow{
        user_id: ID!
        followers_id: ID!
    }

    type allSearchBlogsUsers{
        user_id: ID
        profile_img: String
        username: String
        bio: String
    }

    type Blogs{
        users: [allSearchBlogsUsers]
        blog_id: ID
        heading: String
        content: String
        b_image: String
        tb_likes: Int
        tb_comments: Int
    }

    type SingleBlog{
        blog_id: String
        heading: String
        content: String
        b_image: String
        tb_likes: Int
        tb_comments: Int
        users: [allSearchBlogsUsers]
        bcomments: [subBcomments]
    }

    type Blog_ID{
        blog_id: ID!
    }

    type BlogLikes{
        blike_id: ID
        bluser_id: ID
        blblog_id: ID
        totalBlogLikes: Int
    }

    type Comment{
        bcomment_id: ID
        bluser_id: ID
        blblog_id: ID
        blcomment: String
    }

    type BlogComments{
        bcomments: [subBcomments]
    }

    type subBcomments{
        bcomment_id: ID
        blcomment: String
        replyComments: [ReplyComm]
        blogsComUsers: [ReplyUsers]
        bcommentLikesb:[IsLiked]
    }

    type blogCNTNT{
        blog_id: ID,
        bluser_id: ID
        b_image: String,
        heading: String,
        content: String,
        users: [allSearchBlogsUsers]
    }

    type onlyCMNT{
        bcomment_id:ID,
        blcomment:String,
        blogsComUsers:[blogsComUsers],
        replyComments:[replyComments],
        bcommentLikesb:[bcommentLikesb]
    }

    type blogsComUsers{
        user_id: ID,
        profile_img: String,
        username: String,
        bio: String,
    }

    type replyComments{
        rcomment_id:ID,
        replied_comment:String,
        replyUsers:[replyUsers]
    }

    type replyUsers{
        user_id:ID,
        profile_img: ID,
        username: String
    }

    type bcommentLikesb{
        bluser_id:ID
    }


    type IsLiked{
        bcommentLike_id: ID,
        bluser_id: ID,
        bcomment_idLike: ID
    }

    type ReplyComm{
        rcomment_id: ID
        replied_comment: String
        replyUsers:[ReplyUsers]
    }

    type ReplyUsers{
        user_id: ID!
        profile_img: String
        username: String!
    }

    type friends{
        friend_id: ID
        uUser_id: ID
        followers_id: ID
        following_id: ID
        totalFollowers: Int
        totalFollowing: Int
    }

    type extraInfo{
        extraInfo_id: ID!
        bluser_id: ID!
        Graduation: String!
        finalYear_id: Int!
        skills: [String!]
    }

    type search{ # cancel this query
        search_keyword: String
        blogs: [Blogs] # to be parent
        users: [Users] # to be parent
    }
    
    type friendsUsers{
        user_id: ID
        profile_img: String
        username: String
    }

    type friendsFollowers{
        user_id: ID
        profile_img: String
        username: String
    }

    
    type checksomeone_followers{
        uUser_id: ID
        friendsUsers: [friendsUsers]
    }

    type checksomeone_following{
        followers_id: ID
        friendsFollowers: [friendsFollowers]
        
    }


    type userProfile{
        user_id: ID!
        username: String!
        authorized: Boolean!
        token: String
    }
    
    type returnBoolean{
        isTrue: Boolean!
    }
                         
    type jwtInfo{
        user_id: Int,
    }

    type allInfo{
        user_id: Int
        username: String,
        bio: String,
        link: String,
        usersExtraInfo: [usersExtraInfo]
    }
    type usersExtraInfo{
        qualification: String,
        hometown: String,
        work: String,
        college: String
    }

    type likecommentreturn{
        count: Int,
        success: Boolean,
    }

    type bcommentsfortotal{
        bcomments:[totallikedcmnt]
    }

    type totallikedcmnt{
        totalBlogComments:Int
    }

    type Query{
        verifyjwtFunc: jwtInfo
        users: [Users!]!
        user(id: Int!): [User]
        # homeUser(id: Int!): [homeUserInfo]
        searchUser(searchkeyword: String): [User]
        blog(id: Int!): [blogCNTNT]
        blogs: [Blogs!]!
        homeBlogs(id:Int!): [Blogs!]!
        searchBlog(searchkeyword: String): [Blogs]
        onlycomments(id: ID,user_id:ID): [onlyCMNT]
        totalcomment(id: ID!): [bcommentsfortotal]

        checksomeone_followers(user_id: Int!): [checksomeone_followers]
        checksomeone_following(user_id: Int!): [checksomeone_following]

        imgname: imgname!

        likecomment(bcomment_id:ID): likecommentreturn

        infoquery(id: Int): [allInfo]
        isFollowing(user_id: ID, followers_id: ID):follow
        isCmntLiked(user_id: ID, bcomment_idLike: ID): follow
    }

    type blogData{
        isUploaded: Boolean
    }

    type follow{
        status: Boolean,
        message: String
    }

    type likeMutation{
        status: Boolean,
        message: String
    }

    type Mutation{

        blogData(user_id: ID!, blog_heading: String!, blog_content: String!, blog_image: String!): blogData 

        logout: Boolean
        userAuthenticationCheck(username:String!,password:String!): userProfile
        createUser(input: cuserInfo!): Users

        updateUser(
            user_id: Int!,
            bio: String,
            link: String,
            qualification: String,
            hometown: String,
            work: String,
            college: String): Boolean

        updatePfp(b_image:String, user_id:ID):Boolean

        deleteUser(user_id: Int): Boolean


        createBlog(user_id: ID!, b_image: String, heading: String!, content:String!): Blogs
        deleteBlog(user_id: ID!, blog_id: String!): Blogs

        likeBlog(user_id: Int, blog_id: Int): [BlogLikes]
        unlikeBlog(user_id: Int, blog_id: Int): BlogLikes
        commentBlog(user_id: ID!, blog_id: ID!, commentContent: String!): Comment
        likecommentMutation(user_id:ID, bcomment_idLike:ID): likeMutation
        unlikecommentMutation(user_id:ID,bcomment_idLike:ID):likeMutation
        replyComm(user_id: ID!, parentComment_id: ID!, commentContent: String!): ReplyComm
        deleteComment(rcomment_id: ID!, user_id: ID!, bcomment_id: ID!): Comment
        deleteReplyComment(user_id: ID!, blog_id: ID!, parentComment_id: ID!): ReplyComm

        toFollow(user_id: ID!, followers_id: ID!): follow
        toUnfollow(user_id: ID!, followers_id: ID!): follow
    }

    input cuserInfo{
        username: String!
        email: String!
        password: String!
    }

    input upuserInfo{
        user_id: Int!
        bio: String,
        link: String,
        qualification: String,
        hometown: String,
        work: String,
        college: String
    }
`;

module.exports = {typeDefs};