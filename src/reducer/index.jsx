import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import pujaNameSlice from "../slices/pujaNameSlice";
import roadMapSubjectDataSlice from "../slices/roadMapSubjectDataSlice";
import idDataSlice from "../slices/idSlice";



const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileSlice,
    pujaName: pujaNameSlice,
    roadMapSubjectData: roadMapSubjectDataSlice,
    IdData: idDataSlice,
})

export default rootReducer