import React from 'react';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import IconBtn from '../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5";
import { createRoadMapRelatedTopic } from '../../../../services/operations/roadMapSubject';
import toast from 'react-hot-toast';
import { setAddRelatedSubTopic } from '../../../../slices/roadMapSubjectDataSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
export const RelatedTopicForm = ({currentSubTopicId,RelatedTopicModalValue}) => {
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  

  
  const dispatch = useDispatch();

  useEffect(() => {
            console.log("Current Sub TopicID",currentSubTopicId);
            setValue("SubTopicAssociatedId",currentSubTopicId);
          },[]);  // R
  const handleClick = (e) =>{
    console.log("hello");
   
    e.preventDefault();
    
  }
  const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm();
       const onSubmit = async (data) => {
                
                //console.log(data);
                //console.log("inside submit of SubTopic Form",data);
                console.log("Current SubTopic Id",currentSubTopicId);
                
                const response = await createRoadMapRelatedTopic(data);
                if(response){
                  toast.success("Related Topic Created Successfully");
                  console.log("inside submit of Related Topic Form",response);
                  dispatch(setAddRelatedSubTopic(response));
                  RelatedTopicModalValue();
                }

               
                
              
            }
  return (
     <div>
          <h1>This is Related Topic Form</h1>
         
          <div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                                className="w-full max-w-sm space-y-4">
                      <div>
                                      <label className="block text-gray-700">Related Topic Name</label>
                                        <input
                                          {...register("RelatedTopicName", {
                                            required: "Name of the RoadMap is required",
                                            maxLength: {
                                              value: 18,
                                              message: "First Name cannot exceed 2 characters",
                                              },
                                          })}
                                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
                                        />
                                        {errors.SubTopicName && (
                                          <p className="text-red-500 text-sm">{errors.SubTopicName.message}</p>
                                        )}
                      </div>
                      
                      <div>
                        
                                  
                      </div>
                      
                      
                      <div>
                        <input
                                        type="submit"
                                        className="mt-1 block w-full px-3 py-2 bg-black text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        value="Create Related Topic"
                                      />
                      </div>
                  </form>
              </div>
        </div>
  )
}
