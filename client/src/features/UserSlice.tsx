import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type usersslogin = {
    user_id: number | undefined
}

const initialState:any = {
    users: {},
}

export const userSlice = createSlice({
    name: "usersRedux",
    initialState,
    reducers: {
        logIn:(state, actions: PayloadAction<usersslogin | undefined>) => {
            state.users = actions.payload;
        }
    }
});

export const { logIn } = userSlice.actions;
export const userLoginInfo = (state:any) => state.userSlice.users;
export default userSlice.reducer;