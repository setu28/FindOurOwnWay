import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pujaNamesData: [],
    loading: false,
};

const pujaNameSlice = createSlice({
    name: "pujaName",
    initialState: initialState,
    reducers: {
        setPujaNames(state,action){
            console.log("We are checking value",action.payload);
            state.pujaNamesData = [...state.pujaNamesData, action.payload];
        },
        setRemovePujaNames(state,action){
            console.log("We are trying to remove the puja");
            state.pujaNamesData = state.pujaNamesData.filter(name => name !== action.payload);
        }
    }
});

export const { setPujaNames, setRemovePujaNames } = pujaNameSlice.actions;
export default pujaNameSlice.reducer;