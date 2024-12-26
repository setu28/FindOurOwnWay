import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import pujaNameSlice from "../slices/pujaNameSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileSlice,
    pujaName: pujaNameSlice,
})

export default rootReducer