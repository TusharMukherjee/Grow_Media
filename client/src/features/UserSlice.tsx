import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type usersslogin = {
    id: string | undefined
    username: string | undefined
}

const initialState:any = {
    users: {}
}


export const userSlice = createSlice({
    name: "usersRedux",
    initialState,
    reducers: {
        logIn:(state, actions: PayloadAction<usersslogin>) => {
            state.users = actions.payload;
        }
    }
});

export const { logIn } = userSlice.actions;
export const userLoginInfo = (state:any) => state.userSlice;
export default userSlice.reducer;