import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type usersslogin = {
    user_id: number | undefined
}

const initialState:any = {
    users: {},
    toggleSearch: false,
    mobile: false,
    online: false,
    toggleSide: false
}

export const userSlice = createSlice({
    name: "usersRedux",
    initialState,
    reducers: {
        logIn:(state, actions: PayloadAction<usersslogin | undefined>) => {
            state.users = actions.payload;
        },
        toggleSearchdis:(state, actions: PayloadAction<boolean>) => {
            state.toggleSearch = actions.payload;
        },
        mobiledis:(state, actions: PayloadAction<boolean>) => {
            state.mobile = actions.payload
        },
        onlinedis:(state, actions: PayloadAction<boolean>) => {
            state.online = actions.payload
        },
        toggleSidedis:(state, actions: PayloadAction<boolean>) => {
            state.toggleSide = actions.payload
        }
    }
});

export const { logIn, toggleSearchdis, mobiledis, onlinedis, toggleSidedis } = userSlice.actions;
export const userLoginInfo = (state:any) => state.userSlice.users;
export const toggleSearchInfo = (state:any) => state.userSlice.toggleSearch;
export const mobileInfo = (state:any) => state.userSlice.mobile;
export const onlineInfo = (state:any) => state.userSlice.online;
export const toggleSideInfo = (state:any) => state.userSlice.toggleSide;
export default userSlice.reducer;