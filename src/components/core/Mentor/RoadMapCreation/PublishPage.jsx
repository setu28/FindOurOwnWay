import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createNickName } from '../../../../services/operations/roadMapSubject';
import { publishRoadMap } from '../../../../services/operations/roadMapSubject';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export const PublishPage = () => {
    const {roadMapSubjectsData} = useSelector((state) => state.roadMapSubjectData);
    const {currentroadMapSubjectId} = useSelector((state) => state.IdData);
    const [readyToPublish, setReadyToPublish] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
      console.log("we are inside useEffect",currentroadMapSubjectId);
      setValue("RoadMapId",currentroadMapSubjectId);
    },[])
     const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm();
    const toggleDetails = (topicId) => {
        console.log("Current topic id",topicId);
      };
    
      const toggleDetailsSub =(subTopicId) =>{
        
        console.log("Cuure subtopic id");
      };
      const onSubmit = async (data) => {
        
        console.log("We are inside submit",data);
        const response = await createNickName(data);
        if(response){
          console.log("Nick name updated");
          setReadyToPublish(true);
        }
        
      };
      const handlePublish = async () => {
        if (!readyToPublish) {
            toast.error("Roadmap ID is missing.");
            return;
        }
        const response = await publishRoadMap(currentroadMapSubjectId);
        if(response){
          navigate("/");
        } 
    };
    return (
      
    <div>
        <div className="flex flex-col justify-center">
            RoadMap Details
            <div className="">
                <div>
                {  roadMapSubjectsData[0].topicsAssociated.map((Topic)=>
                        ( 
                          <details key={Topic._id} className="border border-gray-300 rounded-lg shadow-md open:bg-gray-100 open:ring-2 open:ring-indigo-500">
                          <summary  onClick={() => toggleDetails(Topic._id)} className="cursor-pointer p-3 text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg">
                            {Topic.name}
                            
                          </summary>
                          
                          <div className="p-4 bg-white border-t border-gray-300">
                          <h1>Subtopic Info</h1>
                          {Topic.subTopicsAssociated?.map((subTopic)=>(
                            <details key={subTopic._id} className="border border-gray-300 rounded-lg shadow-md open:bg-gray-100 open:ring-2 open:ring-indigo-500">
                              <summary  onClick={() => toggleDetailsSub(subTopic._id)} className="cursor-pointer p-3 text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg">
                              {subTopic.name}
                              </summary>
                              {subTopic.relatedTopicAssociated?.map((relatedTopic)=>(
                                <div key={relatedTopic._id} className="p-4 bg-white border-t border-gray-300">
                                  <div>
                                    {relatedTopic.name}
                                  </div> 
        
                                </div>
                                ))}
        
                              
                                  
                              
        
                               
                              </details>
                           
                            ))}
                          
                             
                          </div>
                          
        
                        </details>
                        
                        ))
        }
                </div>
            </div>

        </div>
        <div className="flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
                      className="w-full max-w-sm space-y-4">
            <div>
                            <label className="block text-gray-700">Unique Name</label>
                              <input
                                {...register("NickName", {
                                  required: "Name of the RoadMap is required",
                                  maxLength: {
                                    value: 18,
                                    message: "Nick Name cannot exceed 18 characters",
                                    },
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
                              />
                              {errors.NickName && (
                                <p className="text-red-500 text-sm">{errors.NickName.message}</p>
                              )}
            </div>
            <div>
              <input
                              type="submit"
                              className="mt-1 block w-full px-3 py-2 bg-black text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              value="Check Nick Name"
                            />
            </div>
        </form>


        </div>
        <div className="flex items-center justify-center pt-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
                Go back
            </button>
            {readyToPublish && <button 
                onClick={handlePublish} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded ">
                Publish 
            </button>}
            
        </div>


    </div>
  )
}
