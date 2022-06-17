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
        b_image
    }
}
`
export const SINGLE_BLOG = gql`
    
    query Query($blogId: Int!) {
        blog(id: $blogId) {
            blog_id
            bluser_id
            b_image
            heading
            content
            users {
            user_id
            profile_img
            username
            bio
            }
        }
    }

`

export const ONLYCMNT = gql`

query Onlycomments($onlycommentsId: ID!, $userId: ID) {
  onlycomments(id: $onlycommentsId, user_id: $userId) {
    bcomment_id
    blcomment
    blogsComUsers {
      user_id
      profile_img
      username
      bio
    }
    replyComments {
      rcomment_id
      replied_comment
      replyUsers {
        user_id
        profile_img
        username
      }
    }
  }
}

`

export const REPTOTAL = gql`

query Totalcomment($totalcommentId: ID!) {
  totalcomment(id: $totalcommentId) {
    bcomments {
      totalBlogComments
    }
  }
}

`


// export const PROFILE = gql`
//     query Query($userId: Int!) {
//         user(id: $userId) {
//             profileImg
//             username
//             email
//             bio
//             link
//             blogs {
//                 blog_id
//                 heading
//                 content
//                 b_image
//             }
//         }
//     }
// `

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
            }
        }
    }
`

export const PROFILE_INFO = gql`

    query Query($userId: Int!) {
        user(id: $userId) {
            user_id
            profile_img
            username
            bio
            link
        }
    }

`


// export const USER_LOGIN_INFO = gql`
//     query UserAuthenticationCheck($username: String!, $password: String!) {
//         userAuthenticationCheck(username: $username, password: $password) {
//             user_id
//             username
//             authorized
//         }
//     }
// `

export const FROM_COOKIE = gql`

    query VerifyjwtFunc {
        verifyjwtFunc {
            user_id
        }
    }

`

export const USER_HOME_POSTS = gql`
    query Blogs {
        blogs {
            users {
            username
            profile_img
            }
            blog_id
            heading
            content
            b_image
        }
    }
`

export const USER_HOME_INFO = gql`
    query Query($userId: Int!) {
        user(id: $userId) {
            username
            profileImg
        }
    }
`

export const HOME_POSTS = gql`
    query Query($homeBlogsId: Int!) {
        homeBlogs(id: $homeBlogsId) {
            blog_id
            heading
            content
            b_image
        }
    }
`

export const EDIT_QUERY = gql`
    query Query($infoqueryId: Int) {
        infoquery(id: $infoqueryId) {
            user_id
            bio
            username
            link
            usersExtraInfo {
            qualification
            hometown
            work
            college
            }
        }
    }
` 

export const ONLY_COMMENTS = gql`
    query Query($onlycommentsId: Int!) {
        onlycomments(id: $onlycommentsId) {
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
export const IS_FOLLOWING = gql`

query Query($userId: ID, $followersId: ID) {
  isFollowing(user_id: $userId, followers_id: $followersId) {
    status
    message
  }
}

`

export const COUNT_CMNT_LIKE = gql`

query Query($bcommentId: ID) {
  likecomment(bcomment_id: $bcommentId) {
    count
    success
  }
}

`

export const IS_LIKED = gql `

query Onlycomments($onlycommentsId: ID, $userId: ID) {
  onlycomments(id: $onlycommentsId, user_id: $userId) {
    bcommentLikesb {
      bluser_id
    }
  }
}

`