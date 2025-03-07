import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateRoadMapTopic } from '../../../../services/operations/updateRoadMapSubjectValues';
import { updateRoadMapSubTopic } from '../../../../services/operations/updateRoadMapSubjectValues';
import { updateRoadMapRelatedTopic } from '../../../../services/operations/updateRoadMapSubjectValues';
import { setUpdateTopic } from '../../../../slices/roadMapSubjectDataSlice';
import { setUpdateSubTopic } from '../../../../slices/roadMapSubjectDataSlice';
import { setUpdateRelatedTopic } from '../../../../slices/roadMapSubjectDataSlice';

const CommonModal = ({modalRef, modalVal}) => {
  const {roadMapSubjectsData} = useSelector((state) => state.roadMapSubjectData);
  const {currentTopicId} = useSelector((state) => state.IdData);
  const {currentSubTopicId,} = useSelector((state) => state.IdData);
  const {currentRelatedTopicId} = useSelector((state) => state.IdData);
  const [currentTopicData, setCurrentTopicData] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    
    let formData = {};

    // Determine what data to extract based on formType
    if (modalVal === 'Topic') {
      const topic = roadMapSubjectsData[0]?.topicsAssociated.find((topic) => topic._id === currentTopicId);
      console.log("Inside useEffect checking topic",topic);
      if (topic) {
        formData = { name: topic.name || '', duration: topic.duration || '' };
      }
    } else if (modalVal === 'SubTopic') {
      const topic = roadMapSubjectsData[0]?.topicsAssociated.find((topic) => topic._id === currentTopicId);
      const subTopic = topic?.subTopicsAssociated.find((sub) => sub._id === currentSubTopicId);
      console.log("Inside useEffect checking sub Topic",subTopic);
      if (subTopic) {
        formData = { name: subTopic.name || '',};
      }
    } else if (modalVal === 'RelatedTopic') {
      const topic = roadMapSubjectsData[0]?.topicsAssociated.find((topic) => topic._id === currentTopicId);
      const subTopic = topic?.subTopicsAssociated.find((sub) => sub._id === currentSubTopicId);
      const relatedTopic = subTopic?.relatedTopicAssociated.find((related) => related._id === currentRelatedTopicId);
      console.log("Inside useEffect checking Related Topic",relatedTopic);
      if (relatedTopic) {
        formData = { name: relatedTopic.name || '',};
      }
    }

    setInitialValues(formData);
    
  }, [roadMapSubjectsData, currentTopicId, currentSubTopicId, currentRelatedTopicId, modalVal]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  
  
  const onSubmit = async (data) => {
   //e.preventDefault();
    //onSubmit(formState); // Send data back to parent
    
    console.log("FOrm submission"); 
    console.log("Form data");
    if(modalVal === 'Topic'){
      console.log("We are in Topic");
      const topicData = {
        id: currentTopicId,
        TopicName: data.name,
        //topicDescription: data.description,
      };
      console.log("topicData inside topic",topicData);
      const res = await updateRoadMapTopic(topicData);
      if(res){
        console.log("We got updated response",res);
        dispatch(setUpdateTopic(topicData));
        modalRef.current.close(); // Close modal after submission


      }
    }
    if(modalVal === 'SubTopic'){
      console.log("We are in SUb Topic");
      const SubTopicData = {
        id: currentSubTopicId,
        SubTopicName: data.name,
        //topicDescription: data.description,
      };
      console.log("topicData inside Sub topic",SubTopicData);
      const res = await updateRoadMapSubTopic(SubTopicData);
      if(res){
        console.log("We got updated response",res);
        dispatch(setUpdateSubTopic(SubTopicData));
        modalRef.current.close(); // Close modal after submission
      }
    }
    if(modalVal === 'RelatedTopic'){
      console.log("We are in Related Topic");
      const RelatedTopicData = {
        id: currentRelatedTopicId,
        RelatedTopicName: data.name,
        //topicDescription: data.description,
      };
      console.log("topicData inside Sub topic",RelatedTopicData);
      const res = await updateRoadMapSubTopic(RelatedTopicData);
      if(res){
        console.log("We got updated response",res);
        dispatch(updateRoadMapRelatedTopic(RelatedTopicData));
        modalRef.current.close(); // Close modal after submission
      }
    }

    

    //modalRef.current.close(); // Close modal after submission
  };
  /*
  const submitHandler = (data) => {
    console.log('Form submitted with:', data);
    modalRef.current.close();
    //onSubmit(data);
  };
  */
  
  return (
    <dialog ref={modalRef} id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Edit Details</h3>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
          {modalVal === 'Topic' && (
  <div>
    <h1>Topic Form </h1>
    <label className="block text-sm font-semibold">Name:</label>
    <input
      {...register('name')}
      className="w-full p-2 border rounded"
    />
    <label className="block text-sm font-semibold">Description:</label>
    <input
      {...register('description')}
      className="w-full p-2 border rounded"
    />
  </div>
)}
          </div>

          <div>
          {modalVal === 'SubTopic' && (
  <div>
  <h1>Topic Form </h1>
  <label className="block text-sm font-semibold">Name:</label>
  <input
    {...register('name')}
    className="w-full p-2 border rounded"
  />
  
</div>
)}
          </div>

          <div>
          {modalVal === 'RelatedTopic' && (
  <div>
  <h1>Topic Form </h1>
  <label className="block text-sm font-semibold">Name:</label>
  <input
    {...register('name')}
    className="w-full p-2 border rounded"
  />
  
</div>
)}

          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn" onClick={() => modalRef.current.close()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default CommonModal