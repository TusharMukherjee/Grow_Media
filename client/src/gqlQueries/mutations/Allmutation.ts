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

export const FROM_COOKIE = gql`

    mutation Mutation {
        verifyjwtFunc {
            user_id
        }
    }

`