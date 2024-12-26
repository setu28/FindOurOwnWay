
import React from 'react'
import { useEffect,useState } from 'react';
import { toast } from 'react-hot-toast';
import { getAllPujaNames } from '../../../services/operations/pujaDetails';
import { updatePujaNamesToPanditProfile } from '../../../services/operations/panditDetailsAPI';
import PujaNameDetails from './PujaNameDetails';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUpPanditDetailsForm = () => {
    const [response, setResponse] = useState([]);
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const responseDetails  = useSelector((state)=> state.pujaName.pujaNamesData);
    const panditId = useSelector((state)=> state.profile.panditId);

    const getData = async()=>{
        try {
            const res = await getAllPujaNames();
            if(res){
                setResponse(res.PujaNameDetails);
                console.log(res);
                
            }
        } catch (error) {
            console.log("We are getting errors",error);
            toast.error("unable to load data");
        }
    }
    useEffect(()=>{
        getData();
    },[]);
    const handleOnSubmit = async(e)=>{
        e.preventDefault();
        try {
            console.log("What are the values ",responseDetails);
            dispatch(updatePujaNamesToPanditProfile(panditId,responseDetails,navigate));

        } catch (error) {
            console.log("Error Error",error);
            toast.error("We are getting some error");
        }
    }
    

  return (
    <div>
        <div className="flex justify-center">
            <div className="py-5">
                <h1>Please select all the Puja You know</h1>
            </div>
        </div>
        <div className="flex flex-row py-6">
            {response?.map((data)=>(
                <PujaNameDetails
                   details={data}
                   key={data._id}
                   
                />
            ))}

        </div>
        <div className="flex justify-center">
            <button className="py-5 px-2" onClick={handleOnSubmit}>
                Click to Proceed
            </button>
            
        </div>
    </div>

  )
}

export default SignUpPanditDetailsForm