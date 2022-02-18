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