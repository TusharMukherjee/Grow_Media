import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type usersslogin = {
    id: string | undefined
    username: string | undefined
}

const initialState:any = {
    users: {},
    userjwtinfo:{}
}

type verifyjwtFunc = {
    verifyjwtFunc:{
       userId: Number 
    }
  }


export const userSlice = createSlice({
    name: "usersRedux",
    initialState,
    reducers: {
        logIn:(state, actions: PayloadAction<usersslogin>) => {
            state.users = actions.payload;
        },
        jwtAfterLogin:(state, actions: PayloadAction<verifyjwtFunc>) =>{
            state.userjwtinfo = actions.payload;
        }
    }
});

export const { logIn,jwtAfterLogin } = userSlice.actions;
export const userLoginInfo = (state:any) => state.userSlice;
export const jwtLogin = (state:any) => state.userSlice.userjwtinfo;
export default userSlice.reducer;