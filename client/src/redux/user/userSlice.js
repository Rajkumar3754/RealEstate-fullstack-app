import { createSlice } from "@reduxjs/toolkit";


 const initialState = {

    currentUser:null,
    error:null,
    loading:false,

};

const userSlice = createSlice({

    name:'user',
    initialState,

    reducers:{

        SignInStart: (state)=>{

            state.loading = true;
        },

        SignInSuccess: (state,action)=>{

            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        SignInFailure: (state,action)=>{

            state.error = action.payload;
            state.loading = false;
        },

        updateUserStart:(state)=>{

            state.loading =  true;


        },

        updateUserSuccess:(state,action)=>{

            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
           

        },

        deleteUserStart:(state)=>{
            state.loading = true;
        },

        deleteUserSuccess:(state)=>{
           state.currentUser = null;
           state.loading = false;
           state.error = null;
        },

        deleteUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },


        SignoutUserStart:(state)=>{
            state.loading = true;
        },

        SignoutUserSuccess:(state)=>{
           state.currentUser = null;
           state.loading = false;
           state.error = null;
        },

        signoutUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        }



},
});


export const {SignInStart,SignInSuccess,SignInFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,SignoutUserStart,SignoutUserSuccess,signoutUserFailure} = userSlice.actions;

export default userSlice.reducer;