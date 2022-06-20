import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type blogsData = {
  blog_id:string,
  heading:string,
  content:string
  users:{
    user_id: string,
    username: string
  }[]
}

  type blogss = {
      blogs: blogsData[]
  }

  // type homeBlogsData = {
  //   blog_id: String,
  //   heading: String,
  //   content: String,
  // }

  // type homeblogss = {
  //   profileImg: String | null,
  //   username: String,
  //   email: String,
  //   bio: String | null,
  //   link: String | null,
  //   blogs: [homeBlogsData]
  // }

  type UserInfoType = {
        user: {
            user_id: string,
            profile_img: string,
            username: string,
            bio: string,
            link: string,
            totalblogs: number,
            no_followingbyuser: number
        }[]
}

type homeblogs = {
  homeBlogs:{
      blog_id: string,
      heading: string,
      content: string,
      b_image: string,
      user_id: string,
      profile_img: string,
      username: string,
      totalblikes: string,
      totalbcomments: string 
  }[]
}
  

  type users = {
    user_id: string;
    username: string;
    bio: string | null;
  }

  type bcomments = {
    bcomment_id: string;
    blcomment:string;
    totalBlogComments:number
    replyComments:{
      rcomment_id:string;
      replied_comment:string;
      replyUsers:{
        user_id: string;
        profile_img: string;
        username: string;
      }[];
    }[];
    blogsComUsers: {
      user_id: string;
      profile_img: string;
      username: string;
    }[];
  }

  // type bluser_id = {
  //   bluser_id: string
  // }


const initialState:any = {
  blogs:[],
  bcomments: [],
  users: [],
  bluser_id: ""
};

export const postSlice = createSlice({
    name: "postsRedux",
    initialState,
    reducers:{
        allPosts:(state, actions: PayloadAction<blogss>) => {
          state.blogs = actions.payload.blogs;
        },
        postComm: (state, actions: PayloadAction<bcomments[]>) => {
          state.bcomments = actions.payload;
        },
        postOwnerInfo: (state, actions: PayloadAction<users[]>) => {
          state.users = actions.payload;
        },
        homeBlogsStore: (state, actions: PayloadAction<homeblogs | undefined>) =>{
          state.user = actions.payload;
        },
        userOwnerId:(state, actions: PayloadAction<string>)=>{
          state.bluser_id = actions.payload;
        }
    }
});


export const { allPosts, postComm, postOwnerInfo, homeBlogsStore, userOwnerId } = postSlice.actions;
export const getAllMovies = (state:any) => state.postSlice;
export const getComm = (state:any) => state.postSlice.bcomments;
export const getOwnerInfo = (state:any) => state.postSlice; 
export const homeBlogsDataStore = (state: any) => state.postSlice.user;
export const bluser_id = (state: any) => state;
export default postSlice.reducer;