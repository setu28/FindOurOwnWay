import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    email: null,
    accType: null,
    userId: null,
    panditId: null,
    userFlag: false,
};

const porfileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state,value){
            state.user = value.payload;
        },
        setEmail(state,value) {
            console.log("We are checking value",value.payload);
            state.email = value.payload;
        },
        setAccType(state,value){
            console.log("We are inside setting account type");
            state.accType = value.payload;
        },
        setUserId(state,value){
            state.userId = value.payload;
        },
        setPanditId(state,value){
            console.log("We are checking value in profile slice",value.payload);
            state.panditId = value.payload;
        },
        //User flag will be used after the user designs to signup and OTP is sent to start the verification process
        setUserFlag(state,value){
            console.log("We are here");
            state.userFlag = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
    },
});

export const { setUser, setLoading, setEmail, setAccType, setUserFlag, setUserId, setPanditId} = porfileSlice.actions;

export default porfileSlice.reducer;