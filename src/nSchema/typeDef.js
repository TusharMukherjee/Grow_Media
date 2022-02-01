const {gql} = require('apollo-server-express');
// "users" defined in resolvers, but not in schema
const typeDefs = gql`

    type imgname{
        img: String!
    }
    
    type Users{
        user_id: ID!
        profileImg: String!
        username: String!
        email: String!
        password: String!
        bio: String
        link: String
    }

    type User{
        user_id: ID!
        profileImg: String!
        username: String!
        email: String!
        password: String!
        bio: String!
        link: String!
        blogs: [Blogs!]! # to be parent
        skills: [extraInfo!]! # to be parent
    }

    type toFollow{
        user_id: ID!
        followers_id: ID!
    }

    type Blogs{
        heading: String!
        content: String!
        b_image: String!
        tb_likes: Int!
        tb_comments: Int!
    }

    type SingleBlog{
        heading: String!
        content: String!
        b_image: String!
        tb_likes: Int!
        tb_comments: Int!
        withComments: [BlogComment!]! # to be parent
    }

    type Blog_ID{
        blog_id: ID!
    }

    type BlogLikes{
        blike_id: ID!
        bluser_id: ID!
        blblog_id: ID!
        totalBlogLikes: Int!
    }

    type Comment{
        bcomment_id: ID!
        bluser_id: ID!
        blblog_id: ID!
        blcomment: String!
    }

    type BlogComment{
        bcomment_id: ID!
        bluser_id: ID!
        blblog_id: ID!
        blcomment: String!
        totalBlogComments: Int!
        replyComments: [ReplyComm!]! # to be parent
    }

    type ReplyComm{
        rcomment_id: ID!
        replyUser_id: ID!
        parentComment_id: ID!
        repliedComment: String!
    }

    type friends{
        mainUser_id: ID!
        uUser_id: ID!
        followers_id: ID!
        following_id: ID!
        totalFollowers: Int!
        totalFollowing: Int!
    }

    type extraInfo{
        extraInfo_id: ID!
        bluser_id: ID!
        Graduation: String!
        finalYear_id: Int!
        skills: [String!]
    }

    type search{
        blogs: [Blogs] # to be parent
        users: [Users] # to be parent
    }

    type Query{
        users: [Users!]!
        user(id: Int!): [User]
        blog(id: Int!): [SingleBlog!]!
        blogs: [Blogs!]!
        search(searchString: String!): search!

        imgname: imgname!
    }

    type Mutation{
        createUser(input: cuserInfo!): Users
        updateUser(input: upuserInfo!): Users
        deleteUser(input: upuserInfo!): Users

        likeBlog(user_id: ID!, blog_id: ID!): Blog_ID!
        unlikeBlog(user_id: ID!, blog_id: ID!): Blog_ID!
        commentBlog(user_id: ID!, blog_id: ID!, commentContent: String!): Comment
        replyComm(user_id: ID!, blog_id: ID!, parentComment_id: ID!, commentContent: String!): ReplyComm
        deleteComment(user_id: ID!, blog_id: ID!): Comment
        deleteReplyComment(user_id: ID!, blog_id: ID!, parentComment_id: ID!): ReplyComm

        toFollow(user_id: ID!, followers_id: ID!): toFollow
        toUnfollow(user_id: ID!, followers_id: ID!): toUnfollow
    }

    input cuserInfo{
        username: String!
        email: String!
        password: String!
    }

    input upuserInfo{
        user_id: Int!
        username: String
        email: String
        password: String
        bio: String
        link: String
    }
`;

module.exports = {typeDefs};