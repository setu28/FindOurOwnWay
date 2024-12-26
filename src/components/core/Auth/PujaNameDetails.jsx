import React from 'react';
import Shimmer from '../../common/Shimmer';
import panditImage from "../../../assets/Images/pandit.jpg";
import { setPujaNames,setRemovePujaNames } from '../../../slices/pujaNameSlice';
import { useDispatch,useSelector } from 'react-redux';



const PujaNameDetails = ({details}) => {
  const dispatch = useDispatch();
  const res = useSelector((state)=> state.pujaName.pujaNamesData);
  const handleAddingPujaNames = (e) =>{
    e.preventDefault();
    console.log("We are in PujaName Details");
    console.log(details.name);
    dispatch(setPujaNames(details.name));
  };
  const handleRemovingPujaNames = (e) =>{
    e.preventDefault();
    console.log("We are inside removing puja name");
    dispatch(setRemovePujaNames(details.name));
  }
  

  return !details  ? (
    <Shimmer/>
  ) :(
    <div className="flex flex-col px-2 py-5">
      <div className="ml-6 px-2">
        <img class="object-contain h-86 w-96" src={panditImage}/>
      </div>
      <div className="ml-6 px-2">
        <h1>Name: {details.name}</h1>
        <div className="py-2">
          <p>Add pujaName to your Pandit Profile</p>
          <button className="px-2" onClick={handleAddingPujaNames}>Add </button>
          <button className="px-2" onClick={handleRemovingPujaNames}>Remove </button>
        </div>
      </div>

    </div>
    
  )
}

export default PujaNameDetails