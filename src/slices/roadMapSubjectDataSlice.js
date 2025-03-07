import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roadMapSubjectsData: [],
    test: [],
    loading: false,
   
};

const roadMapSubjectDataSlice = createSlice({
    name: "roadMapSubjectData",
    initialState: initialState,
    reducers: {
        setAddSubject: (state, action) => {
            if(action.payload===null){
                state.roadMapSubjectsData=[];
                return;
            }
            
                state.roadMapSubjectsData.push({
                    ...action.payload, // Spread all properties from backend response
                    topicsAssociated: [], // Ensure topics are an array if they might be undefined
                  });

            
            
          },
      
          // 2️⃣ Add a new topic to a subject
        setAddTopic: (state, action) => {
          const { roadMapSubjectAssociated, ...topicData } = action.payload; // Extract subjectId and spread topic data
          console.log("We are inside Add topic",roadMapSubjectAssociated);
          console.log("we are checking data",topicData);
          const subjectIndex = state.roadMapSubjectsData.findIndex(sub => sub._id === roadMapSubjectAssociated);
          //const subjectIndex = state.roadMapSubjectsData[0]._id;
          console.log("We are inside setAddTopic",subjectIndex);
          
          if (subjectIndex !== -1) {
            state.roadMapSubjectsData[subjectIndex] = {
              ...state.roadMapSubjectsData[subjectIndex], // Keep existing subject data
              topicsAssociated: [...state.roadMapSubjectsData[subjectIndex].topicsAssociated, { ...topicData }]
            };
          }
            
            
          },
      
          // 3️⃣ Add a new subtopic to a topic
          setAddSubTopic: (state, action) => {
            const { topicsAssociated, ...subtopicData } = action.payload; // Extract subjectId and spread topic data
            console.log("We are inside SetAddSubTopic slice",topicsAssociated[0]);
            console.log("We are inside SetAddSubTopic slice",subtopicData);
            const topicId = topicsAssociated[0]; // Get the associated topic ID
  
               // Find the index of the topic in the single subject's topics array
                const topicIndex = state.roadMapSubjectsData[0]?.topicsAssociated.findIndex(topic => topic._id === topicId);
                console.log("isnde setaddsubtopic",topicIndex);
                state.roadMapSubjectsData[0].topicsAssociated[topicIndex] = {
                  ...state.roadMapSubjectsData[0].topicsAssociated[topicIndex],
                  subTopicsAssociated: [
                    ...(state.roadMapSubjectsData[0].topicsAssociated[topicIndex].subTopicsAssociated || []), 
                    subtopicData
                  ]
                };

            },
            setAddRelatedSubTopic: (state, action) => {
              const { subTopicsAssociated, ...relatedTopicData } = action.payload;
          
              console.log("We are inside SetAddRelatedSubTopic slice", subTopicsAssociated[0]);
              console.log("We are inside SetAddRelatedSubTopic slice", relatedTopicData);
          
              const subTopicId = subTopicsAssociated[0]; // Get the associated subTopic ID
          
              // Loop through subjects
              for (const subject of state.roadMapSubjectsData) {
                  // Loop through topics within a subject
                  for (const topic of subject.topicsAssociated) {
                      // Find the subtopic that matches the provided subTopicId
                      const subTopicIndex = topic.subTopicsAssociated.findIndex(subTopic => subTopic._id === subTopicId);
                      
                      if (subTopicIndex !== -1) {
                          // Update the found subtopic by adding a related topic
                          console.log("We found in related topic");
                          topic.subTopicsAssociated[subTopicIndex] = {
                              ...topic.subTopicsAssociated[subTopicIndex],
                              relatedTopicAssociated: [
                                  ...(topic.subTopicsAssociated[subTopicIndex].relatedTopicAssociated || []),
                                  relatedTopicData
                              ]
                          };
                          return; // Exit once the update is done
                      }
                  }
              }
          },
          setUpdateTopic: (state, action) => {
            const { id, TopicName } = action.payload;
            console.log("Checking updated data", TopicName);
        
            state.roadMapSubjectsData = state.roadMapSubjectsData.map(subject => ({
                ...subject,
                topicsAssociated: subject.topicsAssociated.map(topic =>
                    topic._id === id
                        ? { ...topic, name: TopicName } // Update topic name
                        : topic
                )
            }));
        },
        
        
        
        
        setUpdateSubTopic: (state, action) => {
          const { id, SubTopicName } = action.payload;
      
          state.roadMapSubjectsData = state.roadMapSubjectsData.map(subject => ({
              ...subject,
              topicsAssociated: subject.topicsAssociated.map(topic => ({
                  ...topic,
                  subTopicsAssociated: topic.subTopicsAssociated.map(subTopic =>
                      subTopic._id === id
                          ? { ...subTopic, name: SubTopicName } // Update subtopic name
                          : subTopic
                  )
              }))
          }));
      },
      
      setUpdateRelatedTopic: (state, action) => {
        const { id, RelatedTopicName } = action.payload;
    
        state.roadMapSubjectsData = state.roadMapSubjectsData.map(subject => ({
            ...subject,
            topicsAssociated: subject.topicsAssociated.map(topic => ({
                ...topic,
                subTopicsAssociated: topic.subTopicsAssociated.map(subTopic => ({
                    ...subTopic,
                    relatedTopicAssociated: subTopic.relatedTopicAssociated.map(relatedTopic =>
                        relatedTopic._id === id
                            ? { ...relatedTopic, name: RelatedTopicName } // Update related topic name
                            : relatedTopic
                    )
                }))
            }))
        }));
    }
            
    }
});

export const { setAddSubject, setAddTopic, setAddSubTopic, setAddRelatedSubTopic, setUpdateTopic, setUpdateSubTopic, setUpdateRelatedTopic  } = roadMapSubjectDataSlice.actions;
export default roadMapSubjectDataSlice.reducer;