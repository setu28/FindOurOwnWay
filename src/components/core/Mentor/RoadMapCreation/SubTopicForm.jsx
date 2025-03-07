import React from 'react';
import { set, useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5"
import { useState } from 'react';
import { createRoadMapSubTopic } from '../../../../services/operations/roadMapSubject';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAddSubTopic } from '../../../../slices/roadMapSubjectDataSlice';
import { RelatedTopicForm } from './RelatedTopicForm';


export const SubTopicForm = ({SubTopicModal,currentTopicId}) => {
  const [loading, setLoading] = useState(false);
  const [relatedTopicModal, setRelatedTopicModal] = useState(false);
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);
  const [openSubTopicId, setOpenSubTopicId] = useState(null);
  
  const {roadMapTopicData} = useSelector((state) => state.roadMapSubjectData);
  useEffect(() => {
          console.log("ehllo",currentTopicId);
          setValue("topicAssociatedId",currentTopicId);
        },[]);  // R

  const handleClick = (e) =>{
    console.log("hello");
    
    e.preventDefault();
    
  }
  const handleRelatedTopicModal = (e) => {
    e.preventDefault();
    setRelatedTopicModal(false);
  }
   const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
        } = useForm();
     const onSubmit = async (data) => {
              
              console.log(data);
              console.log("inside submit of SubTopic Form",data);
             
              const response = await createRoadMapSubTopic(data);
              if(response){
                console.log("inside submit of Sub topic",response);
                dispatch(setAddSubTopic(response));
                setRelatedTopicModal(true);
                SubTopicModal();

              }
            
          }
  
  return (
    <div>
      <h1>This is SubTopic Form</h1>
      <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                            className="w-full max-w-sm space-y-4">
                  <div>
                                  <label className="block text-gray-700">Sub Topic Name</label>
                                    <input
                                      {...register("SubTopicName", {
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
                    
                                <IconBtn
                                    onclick={handleClick}
                                    disabled={loading}
                                    text={editSectionName ? "Edit Section Name" : "Create Related Topic"}
                                    outline={true}
                                >
                                <IoAddCircleOutline size={20} className="text-yellow-50" />
                                </IconBtn>  
                  </div>
                  <div>
                    {relatedTopicModal && <RelatedTopicForm RelatedTopicModalValue={handleRelatedTopicModal} currentSubTopicId={openSubTopicId}/>}
                  </div>
                  
                  <div>
                    <input
                                    type="submit"
                                    className="mt-1 block w-full px-3 py-2 bg-black text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    value="Create Sub Topic"
                                  />
                  </div>
              </form>
          </div>
    </div>
  )
}
