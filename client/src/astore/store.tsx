import {configureStore} from '@reduxjs/toolkit'
import {postSlice} from '../features/PostSlice'
import { userSlice } from '../features/UserSlice';

export const store = configureStore({
    reducer:{
        postSlice: postSlice.reducer,
        userSlice: userSlice.reducer
    }
})