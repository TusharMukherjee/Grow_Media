import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`

    mutation Mutation($input: cuserInfo!) {
        createUser(input: $input) {
            user_id
            username
            email
            password
        }
    }

`

export const USER_LOGIN_INFO = gql`
    mutation Mutation($username: String!, $password: String!) {
        userAuthenticationCheck(username: $username, password: $password) {
            user_id
            username
            authorized
            token
        }
    }
`

export const FROM_COOKIE_Mutation = gql`

    mutation Mutation {
        verifyjwtFunc {
            user_id
        }
    }

`

export const LOG_OUT = gql`

    mutation Mutation {
        logout
    }

`

export const EDITPROFILE_MUTATION = gql`

mutation Mutation($userId: Int!, $bio: String, $link: String, $qualification: String, $hometown: String, $work: String, $college: String) {
  updateUser(user_id: $userId, bio: $bio, link: $link, qualification: $qualification, hometown: $hometown, work: $work, college: $college)
}

`

export const UPDATEPFP = gql`

mutation Mutation($bImage: String, $userId: ID) {
  updatePfp(b_image: $bImage, user_id: $userId)
}

`

export const DELETE_PROFILE = gql`

    mutation Mutation($userId: Int) {
        deleteUser(user_id: $userId)
    }

`

export const CREATE_POST = gql`

    mutation Mutation($userId: ID!, $blogHeading: String!, $blogContent: String!, $blogImage: String!) {
        blogData(user_id: $userId, blog_heading: $blogHeading, blog_content: $blogContent, blog_image: $blogImage) {
        isUploaded
        }
    }

`

export const COMMENT = gql`

    mutation Mutation($userId: ID!, $blogId: ID!, $commentContent: String!) {
        commentBlog(user_id: $userId, blog_id: $blogId, commentContent: $commentContent) {
            blcomment
            bcomment_id
        }
    }

`
export const REPLY_COMMENTS = gql`

    mutation Mutation($userId: ID!, $parentCommentId: ID!, $commentContent: String!) {
        replyComm(user_id: $userId, parentComment_id: $parentCommentId, commentContent: $commentContent) {
            rcomment_id
            replied_comment
            replyUsers {
            user_id
            profile_img
            username
            }
        }
    }

`

export const FOLLOW = gql`

mutation ToFollow($userId: ID!, $followersId: ID!) {
  toFollow(user_id: $userId, followers_id: $followersId) {
    status
    message
  }
}

`

export const UNFOLLOW =gql`

mutation ToUnfollow($userId: ID!, $followersId: ID!) {
  toUnfollow(user_id: $userId, followers_id: $followersId) {
    status
    message
  }
}

`

export const LIKECMNT = gql`

mutation Mutation($userId: ID, $bcommentIdLike: ID) {
  likecommentMutation(user_id: $userId, bcomment_idLike: $bcommentIdLike) {
    status
    message
  }
}

`

export const UNLIKECMNT = gql`

mutation UnlikecommentMutation($userId: ID, $bcommentIdLike: ID) {
  unlikecommentMutation(user_id: $userId, bcomment_idLike: $bcommentIdLike) {
    status
    message
  }
}

`