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

    mutation UpdateUser($userId: Int!, $bio: String, $link: String, $qualification: String, $hometown: String, $work: String, $college: String) {
        updateUser(user_id: $userId, bio: $bio, link: $link, qualification: $qualification, hometown: $hometown, work: $work, college: $college)
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