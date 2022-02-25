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

  

  type users = {
    user_id: string;
    username: string;
    bio: string | null;
  }

  type bcomments = {
    bcomment_id: string;
    blcomment:string;
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

  type SingleBlogOutput = {
    blog:[{
      blog_id: string;
      heading: string;
      content: string;
      users: users[];
      bcomments: bcomments[]
    }];
  }



const initialState:any = {
  blogs:[],
  bcomments: [],
  users: []
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
        }
    }
});


export const { allPosts, postComm, postOwnerInfo } = postSlice.actions;
export const getAllMovies = (state:any) => state.postSlice;
export const getComm = (state:any) => state.postSlice.bcomments;
export const getOwnerInfo = (state:any) => state.postSlice; 
export default postSlice.reducer;