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
        profileImg: String
        username: String
        email: String
        password: String
        bio: String
        link: String
        blogs: [Blogs] # to be parent
        skills: [extraInfo] # to be parent
    }

    type toFollow{
        user_id: ID!
        followers_id: ID!
    }

    type allSearchBlogsUsers{
        user_id: ID
        profileImg: String
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
        totalBlogComments: Int
        replyComments: [ReplyComm]
        blogsComUsers: [ReplyUsers]
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

    type Query{
        users: [Users!]!
        user(id: Int!): [User]
        searchUser(searchkeyword: String): [User]
        blog(id: Int!): [SingleBlog]
        blogs: [Blogs!]!
        searchBlog(searchkeyword: String): [Blogs]
        onlycomments(id: Int!): [BlogComments]

        checksomeone_followers(user_id: Int!): [checksomeone_followers]
        checksomeone_following(user_id: Int!): [checksomeone_following]

        imgname: imgname!
    }

    type Mutation{
        createUser(input: cuserInfo!): Users
        updateUser(input: upuserInfo!): Users
        deleteUser(input: upuserInfo!): User


        createBlog(user_id: ID!, b_image: String, heading: String!, content:String!): Blogs
        deleteBlog(user_id: ID!, blog_id: String!): Blogs

        likeBlog(user_id: Int, blog_id: Int): [BlogLikes]
        unlikeBlog(user_id: Int, blog_id: Int): BlogLikes
        commentBlog(user_id: ID!, blog_id: ID!, commentContent: String!): Comment
        replyComm(user_id: ID!, parentComment_id: ID!, commentContent: String!): ReplyComm
        deleteComment(rcomment_id: ID!, user_id: ID!, bcomment_id: ID!): Comment
        deleteReplyComment(user_id: ID!, blog_id: ID!, parentComment_id: ID!): ReplyComm

        toFollow(user_id: ID!, followers_id: ID!): friends
        toUnfollow(user_id: ID!, followers_id: ID!): friends
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