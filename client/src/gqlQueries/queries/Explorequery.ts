import {gql} from '@apollo/client';

export const GET_ALL_BLOGS = gql`
    query Query {
    blogs {
        users {
            user_id
            username
        }
        blog_id
        heading
        content
    }
}
`
export const SINGLE_BLOG = gql`
    query Query($blogId: Int!) {
        blog(id: $blogId) {
            blog_id
            heading
            content
            users {
                user_id
                username
                bio
            }
            bcomments {
                bcomment_id
                blcomment
                replyComments {
                    rcomment_id
                    replied_comment
                    replyUsers {
                    user_id
                    profile_img
                    username
                    }
                }
                blogsComUsers {
                    user_id
                    profile_img
                    username
                }
            }
        }
    }
`

export const PROFILE = gql`
    query Query($userId: Int!) {
        user(id: $userId) {
            profileImg
            username
            email
            bio
            link
            blogs {
                blog_id
                heading
                content
                b_image
                tb_likes
            }
        }
    }
`

export const USER_LOGIN_INFO = gql`
    query Query($username: String!, $password: String!) {
        userAuthenticationCheck(username: $username, password: $password) {
            user_id
            username
            password
        }
    }
`

// export const ONLY_COMMENTS = gql`
//     query Query($onlycommentsId: Int!) {
//         onlycomments(id: $onlycommentsId) {
//             bcomments {
//             bcomment_id
//             blcomment
//             replyComments {
//                 rcomment_id
//                 replied_comment
//                 replyUsers {
//                 user_id
//                 profile_img
//                 username
//                 }
//             }
//             blogsComUsers {
//                 user_id
//                 profile_img
//                 username
//             }
//             }
//         }
//     }
// `