import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentroadMapSubjectId: null,
    currentTopicId: null,
    currentSubTopicId: null,
    currentRelatedTopicId: null,
   
};

const idDataSlice = createSlice({
    name: "IdData",
    initialState: initialState,
    reducers: {
        setAddRoadMapSubjectId: (state, action) => {
           state.currentroadMapSubjectId = action.payload;

            
            
          },
      
        // 2️⃣ Add a new topic to a subject
        setAddCurrentTopicId: (state, action) => {
            state.currentTopicId = action.payload;
          
            
            
          },
      
        // 3️⃣ Add a new subtopic to a topic
        setAddCurrentSubTopicId: (state, action) => {
            state.currentSubTopicId = action.payload;

        },
        setAddCurrentRelatedTopicId: (state, action) => {
            state.currentRelatedTopicId = action.payload;
             
        }
          
         
    }
});

export const { setAddRoadMapSubjectId,setAddCurrentTopicId,setAddCurrentSubTopicId,setAddCurrentRelatedTopicId } = idDataSlice.actions;
export default idDataSlice.reducer;