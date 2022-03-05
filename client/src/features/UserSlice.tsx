import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type userss = {
    username: string | undefined,
    password: string | undefined
}

const initialState:any = {
    users: {}
}


export const userSlice = createSlice({
    name: "usersRedux",
    initialState,
    reducers: {
        logIn:(state, actions: PayloadAction<userss>) => {
            state.users = actions.payload;
        }
    }
});

export const { logIn } = userSlice.actions;
export const userLoginInfo = (state:any) => state.userSlice;
export default userSlice.reducer;