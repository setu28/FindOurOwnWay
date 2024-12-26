import React from 'react';
import panditImage from "../../../assets/Images/pandit.jpg";
import { useState,useEffect } from "react";
import Footer from "../../common/Footer";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { checkAvailability } from '../../../services/operations/Availability';
import { useNavigate } from 'react-router-dom';
import { getPanditDetails } from '../../../services/operations/panditDetailsAPI';




const PanditProfileView = () => {
    const [ availability, setAvailability ] = useState(false);
    const { panditId } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        ;(async()=>{
            try {
                const res = await getPanditDetails(panditId);
                console.log("Inside useEffect",res);
                setData(res);
            } catch (error) {
                console.log("We are facing issues");
                toast.error("Something error");
            }
        })()
    },[])
    const handlecheckAvailability = async(e)=>{
        e.preventDefault();
        try {
            if(availability){
                toast.success("Pandit Available at the Time & Day selected");
            }
            else{
                const res = await checkAvailability(true);
                if(res){
                    toast.success("Pandit Available at the time & Day selected");
                    setAvailability(true);
                }
                else{
                    toast.error("Pandit not available at given point of time");
                    setAvailability(false);
                }   
            }
        } catch (error) {
            toast.error("Unable to check Availability Please try again");
        }
    }
    const handleConfirmation = async(e)=>{
        e.preventDefault();
        console.log("We are inside handle Confirmation",availability);
        try {
            if(availability){
                console.log("Inside available");
                dispatch(navigate(`/home/PujaAndSamagriSelection/${panditId}`));
            }
            else{
                console.log("We are inside else");
                toast.error("Please check availability first");
            }
        } catch (error) {
            
        }
    }

  return (
    <div className="flex flex-col"> 
        <div class="grid grid-cols-2 gap-4 h-96">
            <div className="ml-16 py-4 px-4">
                <div className="ml-16 px-16">
                    <img class="object-contain h-86 w-96" src={panditImage}/>
                </div>
            </div>
            <div className="flex flex-col py-4">
                    <h1 className="text-xl">Name: {data?.userDetails?.firstName} {data?.userDetails?.lastName}</h1>
                    <h1 className="text-xl" >About the Pandit: {data?.panditDetails?.about}</h1>
                    <h1  className="text-xl">Eductational Background: 
                        {data?.panditDetails?.educationalBackground?.map((item) => (<>{item}</>))}
                    </h1>
                    <h1  className="text-xl">Languages Known: 
                        {data?.panditDetails?.languagesKnown?.map((item) => (<>{item}</>))}
                    </h1>
                    <div className="py-2">
                        <h1 className="text-xl">Avaialability: </h1>
                        <button className="px-4" onClick={handlecheckAvailability}>Check Availability</button>
                    </div>
                    <div className="py-2">
                        <p>Click the below Button to Confirm Pandit & Proceed Booking</p>
                        <button className="px-4" onClick={handleConfirmation}>Proceed to Booking</button>
                    </div>
            </div>
        </div>
        <div className="grid justify-items-center px-1 py-4 h-56">
            <div className="flex flex-col">
                <div className="py-1 w-100 px-16">
                <h1 className="text-xl">Review of Pandit From other users</h1>
                </div>
                <div className="py-1 w-100 px-12">
                <p className="px-12">Review Slider</p>
                </div>
                <div className="flex py-1">
                
                </div>
            </div>
        </div>
        <div className="relative max-auto flex w-11/12 flex-col items-center justify-between text-richblack-500 py-32">
            <Footer/>
        </div>
    </div>
  )
}

export default PanditProfileView