import React from 'react';
import { useForm } from 'react-hook-form';
import ChipInput from './ChipInput';
import { useDispatch } from 'react-redux';
import {setAddSubject } from '../../../../slices/roadMapSubjectDataSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createRoadMapSubject } from '../../../../services/operations/roadMapSubject';
import { setAddRoadMapSubjectId } from '../../../../slices/idSlice';
export const FirstForm = ({setFlagValue}) => {
    const { testing } = useSelector((state) => state.roadMapSubjectData);
    //const  { roadMapSubTopicData }  = useSelector((state) => state.roadMapSubjectData)
    
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
      } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        //
        
        //if(dispatch(createRoadMapSubject(data))){
          //  setFlagValue(false);
        //}
        const response = await createRoadMapSubject(data);

        if(response){
            dispatch(setAddSubject(null));
           console.log("inside submit of First Form",response);
            dispatch(setAddSubject(response));
            dispatch(setAddRoadMapSubjectId(response._id));
            setFlagValue(false);
        }
        

        

       
      }
    useEffect(()=>{
        console.log("We are trying to check the value",testing);
        //console.log("We are trying to check the value",roadMapSubTopicData.length);
    },[])
  return (
    <div>
        <div className="flex w-full flex-col items-center">
            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                        <input
                            {...register("Name", {
                                required: "Name of the RoadMap is required",
                                maxLength: {
                                value: 18,
                                message: "First Name cannot exceed 2 characters",
                            },
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
                        />
                        {errors.Name && (
                            <p className="text-red-500 text-sm">{errors.Name.message}</p>
                        )}
                </div>
                <div>
                    <label className="block text-gray-700">RoadMap Subject</label>
                        <input
                            {...register("RoadmapSubjectValue", {
                                required: "Subject of the RoadMap is required",
                                maxLength: {
                                value: 18,
                                message: "First Name cannot exceed 2 characters",
                            },
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
                        />
                        {errors.RoadmapSubjectValue && (
                        <p className="text-red-500 text-sm">{errors.RoadmapSubjectValue.message}</p>
                        )}
                </div>
                <div>
                    {/* Course Tags */}
                    <ChipInput
                        label="Tags"
                        name="courseTags"
                        placeholder="Enter Tags and press Enter"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Expected Duration(In Days)</label>
                        <input
                            type="number"
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
                    <input
                        type="submit"
                        className="mt-1 block w-full px-3 py-2 bg-black text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    />
                </div>
            </form>
        </div>
        
    </div>
  )
}
