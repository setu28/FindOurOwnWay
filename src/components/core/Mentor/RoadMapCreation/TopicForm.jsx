import React from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRoadMapTopic } from '../../../../services/operations/roadMapSubject';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { setAddTopic } from '../../../../slices/roadMapSubjectDataSlice';
import { SubTopicForm } from './SubTopicForm';
import { setAddCurrentTopicId } from '../../../../slices/idSlice';

export const TopicForm = ( {handleTopicSubmit})  => {
    const [loading, setLoading] = useState(false)
    const [editSectionName, setEditSectionName] = useState(null);
    const [subTopicModal, setSubTopicModal] = useState(false);
    const  {roadMapSubjectsData}  = useSelector((state) => state.roadMapSubjectData);
    
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("ehllo",roadMapSubjectsData[0].name);
        setValue("RoadMapNameValue",roadMapSubjectsData[0].name);
      },[]);  // Re-run when Redux state updates
     
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
      const handleClick = (e) =>{
        console.log("hello");
        //console.log(roadMapSubTopicData);
        //dispatch(setRoadMapSubTopic(1));
        //e.preventDefault();
        e.preventDefault();
        /*
        console.log(roadMapTopicData);
        if(roadMapTopicData.length===0){
          toast.error("Please fill the topic details");
        }
        else{
          setSubTopicModal(true);

        }
          */
      }
    const onSubmit = async (data) => {
         

         
          const response = await createRoadMapTopic(data);
          
                if(response){
                  console.log("inside submit of Topic From",response);
                  dispatch(setAddTopic(response));
                  dispatch(setAddCurrentTopicId(response._id));
                  handleTopicSubmit();
                }
                else{
                  toast.error("Please fill all the required information");
                }
        
            
    
        }
  return (
    <div>TopicForm
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
}
