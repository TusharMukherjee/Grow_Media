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