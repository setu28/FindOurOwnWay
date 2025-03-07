import React from 'react';
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from "react-icons/io5"
import IconBtn from '../../../common/IconBtn';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SubTopicForm } from './SubTopicForm';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxDropdownMenu } from "react-icons/rx";
import { createRoadMapTopic } from '../../../../services/operations/roadMapSubject';
import { setAddTopic } from '../../../../slices/roadMapSubjectDataSlice';
import { TopicForm } from './TopicForm';
import { RelatedTopicForm } from './RelatedTopicForm';
import CommonModal from './CommonModal';
import { setAddCurrentTopicId } from '../../../../slices/idSlice';
import { setAddCurrentSubTopicId } from '../../../../slices/idSlice';
import { setAddCurrentRelatedTopicId } from '../../../../slices/idSlice';



export const SecondForm = () => {
  
  const [topicModal, settopicModal] = useState(false);
  const [subTopicModal, setSubTopicModal] = useState(false);  
  const [openTopicId, setOpenTopicId] = useState(null);
  const [openSubTopicId, setOpenSubTopicId] = useState(null);
  const [openRelatedTopicId, setOpenRelatedTopicId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstFormModal, setFirstFormModal] = useState(true);
  const [relatedTopicModal, setRelatedTopicModal] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const navigate = useNavigate();
  const {roadMapSubjectsData} = useSelector((state) => state.roadMapSubjectData);
  const {currentroadMapSubjectId} = useSelector((state) => state.IdData);
  const {currentTopicId} = useSelector((state) => state.IdData);
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const toggleDetails = (topicId) => {
    
    setOpenTopicId((prevId) => (prevId === topicId ? null : topicId)); 
    dispatch(setAddCurrentTopicId(topicId));
    
    console.log("Current topic id",topicId);
  };
  const toggleDetailsSub =(subTopicId) =>{
    setOpenSubTopicId((prevId) => (prevId === subTopicId ? null : subTopicId));
    dispatch(setAddCurrentSubTopicId(subTopicId));
    console.log("Cuure subtopic id",openSubTopicId);
  };
  const toggleDetailsRelated =(relatedTopicId) =>{
    setOpenRelatedTopicId((prevId) => (prevId === relatedTopicId ? null : relatedTopicId));
    dispatch(setAddCurrentRelatedTopicId(relatedTopicId));
    console.log("Cuure Related id",openRelatedTopicId);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    console.log("RoadMapValue",roadMapSubjectsData[0].name);
    console.log("Checking Subject Id",currentroadMapSubjectId);
    console.log("we are inside useEeffect",roadMapSubjectsData);
    setValue("RoadMapNameValue",roadMapSubjectsData[0].name);
   
  },[roadMapSubjectsData]);  // Re-run when Redux state updates
 
  
  const onSubmit = async (data) => {
     
      
      const response = await createRoadMapTopic(data);
      if(response){
        console.log("Response create First Topic",response);
        dispatch(setAddTopic(response));
        dispatch(setAddCurrentTopicId(response._id));
        console.log("inside submit",roadMapSubjectsData[0]?.topicsAssociated.length);
        setFirstFormModal(false);
      }
        

    }
  
  const handleAddTopicClick = () =>{
    settopicModal(true);
  }
  const handleTopicModal = ()=>{
    settopicModal(false);
  }
  const handleSubTopicModal = () =>{
    setSubTopicModal(false);
  }
  const handleCreateSubTopic = (e) =>{
    
    setSubTopicModal(true);
    e.preventDefault();
    
  }
  const handleClickRelatedTopic = (e) =>{
    setRelatedTopicModal(true);
    e.preventDefault();


  }
  const handleSubTopic = (e) =>{
    console.log("handleSubTopic");
   
    e.preventDefault();
    
  }
  const handleRelatedTopicModal = (e) => {
    console.log("handleRelatedTopicModal");
    
    setRelatedTopicModal(false);
    //e.preventDefault();
  }

  const handleSubmission = (e) =>{
    console.log("handleSubmission");
    e.preventDefault();
    navigate("/publishRoadmap");
  }
  const handleEdit = (e) =>{  
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }
      
    
    
    
  return (
    <div>
      {firstFormModal ? 
        (
          <div className="flex w-full flex-col items-center">
            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-sm space-y-4">
                <div>
                    <label className="block text-gray-700">Topic Name</label>
                      <input
                        {...register("TopicName", {
                          required: "Name of the RoadMap is required",
                          maxLength: {
                            value: 18,
                            message: "First Name cannot exceed 2 characters",
                            },
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
                      />
                      {errors.TopicName && (
                        <p className="text-red-500 text-sm">{errors.TopicName.message}</p>
                      )}
                </div>
                <div>
                  <label className="block text-gray-700">Duration</label>
                    <input
                      {...register("Duration", {
                        required: "Subject of the RoadMap is required",
                        maxLength: {
                        value: 18,
                        message: "First Name cannot exceed 2 characters",
                        },
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
                    />
                    {errors.Duration && (
                      <p className="text-red-500 text-sm">{errors.Duration.message}</p>
                    )}
                </div>
                <div>
                  
                </div>
                
                <div>
                    <input
                      type="submit"
                      className="mt-1 block w-full px-3 py-2 bg-black text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      value="Create Topic"
                    />
                </div>
            </form>
          </div>
        ) 
        : 
        (
          <div>
              {  roadMapSubjectsData[0].topicsAssociated.map((Topic)=>
                ( 
                  <details key={Topic._id} className="border border-gray-300 rounded-lg shadow-md open:bg-gray-100 open:ring-2 open:ring-indigo-500">
                  <summary  onClick={() => toggleDetails(Topic._id)} className="cursor-pointer p-3 text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg">
                    <span>{Topic.name}</span>
                    <button onClick={handleEdit} className="bg-blue-100 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded ml-4">
                             Edit
                     </button>
                     <CommonModal modalRef={modalRef} modalVal={"Topic"}/>
                    
                  </summary>
                  
                  <div className="p-4 bg-white border-t border-gray-300">
                  <h1>Subtopic Info</h1>
                  {Topic.subTopicsAssociated?.map((subTopic)=>(
                    <details key={subTopic._id} className="border border-gray-300 rounded-lg shadow-md open:bg-gray-100 open:ring-2 open:ring-indigo-500">
                     
                      <summary  onClick={() => toggleDetailsSub(subTopic._id)} className="cursor-pointer p-3 text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg">
                    
                      {subTopic.name}
                      <button onClick={handleEdit} className="bg-blue-100 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded ml-4">
                             Edit
                     </button>
                     <CommonModal modalRef={modalRef} modalVal={"SubTopic"}/>
                      </summary>
                      
                      {subTopic.relatedTopicAssociated?.map((relatedTopic)=>(
                        
                        <details key={relatedTopic._id} className="border border-gray-300 rounded-lg shadow-md open:bg-gray-100 open:ring-2 open:ring-indigo-500">
                     
                            <summary  onClick={() => toggleDetailsSub(relatedTopic._id)} className="cursor-pointer p-3 text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg">
                    
                            {relatedTopic.name}
                            <button onClick={handleEdit} className="bg-blue-100 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded ml-4">
                                Edit
                            </button>
                            <CommonModal modalRef={modalRef} modalVal={"RelatedTopic"}/>
                            </summary>
                        </details>
                        ))}

                      
                          {relatedTopicModal && <RelatedTopicForm RelatedTopicModalValue={handleRelatedTopicModal} currentSubTopicId={openSubTopicId}/>}
                          
                      

                      <IconBtn
                                                        onclick={handleClickRelatedTopic}
                                                        disabled={loading}
                                                        text={editSectionName ? "Edit Section Name" : "Create Related Topic"}
                                                        outline={true}
                                                    >
                                                    <IoAddCircleOutline size={20} className="text-yellow-50" />
                        </IconBtn>  
                      </details>
                   
                    ))}
                  
                    {subTopicModal && <SubTopicForm SubTopicModal={handleSubTopicModal} currentTopicId={openTopicId}/>}
                     <div>
                                        
                                                    <IconBtn
                                                        onclick={handleCreateSubTopic}
                                                        disabled={loading}
                                                        text={editSectionName ? "Edit Section Name" : "Create Sub Topic"}
                                                        outline={true}
                                                    >
                                                    <IoAddCircleOutline size={20} className="text-yellow-50" />
                                                    </IconBtn>  
                                      </div>
                  </div>
                  

                </details>
                
                ))
              }
              { topicModal && <TopicForm handleTopicSubmit={handleTopicModal} /> }
              
              <button onClick={handleAddTopicClick} className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add More Topics
              </button>
          </div>
        )
      }
      <div className="flex items-center justify-center pt-6">
            <button onClick={handleSubmission} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Proceed With Publish
            </button>
        </div>
      
    </div>
  )
}
