import React from 'react';
import { useState } from 'react';
import panditImage from "../../../../assets/Images/pandit.jpg";
import { useEffect } from 'react';
import Footer from '../../../common/Footer';
import { useParams } from 'react-router-dom';
import { getPanditDetails } from '../../../../services/operations/panditDetailsAPI';
import { toast } from 'react-hot-toast';
import { approvePandit } from '../../../../services/operations/admin';

const PanditProfilePage = () => {
    const [rejectionReason, setRejectionReason] = useState([]);
    const [data, setData] = useState([]);
    const { panditId } = useParams();
    const handleApprove = async(e) => {
        e.preventDefault();
        try {
            const res = await approvePandit(panditId);
            if(res){
                toast.success("Pandit Approved");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    const handleOnChange = (e) =>{
        e.preventDefault();
    }
    useEffect(()=>{
        ;(async() =>{
            try {
                const res = await getPanditDetails(panditId);
                console.log("Inside useEffect",res);
                setData(res);
            } catch (error) {
                console.log("We are facing issues");
                toast.error("SOmething error");
            }
        })()
    },[])
    return (
        <div className="flex flex-col"> 
            <div class="grid grid-cols-2 gap-4 h-96">
                <div className="ml-16 py-4 px-4">
                    <div className="ml-16 px-16">
                        <img class="object-contain h-86 w-96" src={panditImage}/>
                    </div>
                </div>
                <div className="flex flex-col py-4">
                    <h1 className="text-xl">Namesss: {data?.userDetails?.firstName} {data?.userDetails?.lastName}</h1>
                    <h1 className="text-xl" >About the Pandit: {data?.panditDetails?.about}</h1>
                    <h1  className="text-xl">Eductational Background: 
                        {data?.panditDetails?.educationalBackground?.map((item) => (<>{item}</>))}
                    </h1>
                    <h1  className="text-xl">Languages Known: 
                        {data?.panditDetails?.languagesKnown?.map((item) => (<>{item}</>))}
                    </h1>
                    <h1 className="text-xl">Avaialability: </h1>
                    <div className="py-2">
                        <p>Click the below Button to Approve Pandit</p>
                        <button className="px-4" onClick={handleApprove}>Approve Pandit</button>
                    </div>
                </div>
            </div>
            <div className="grid justify-items-center px-1 py-4 h-56">
                <div className="flex flex-col">
                    <div className="py-1 w-100 px-16">
                        <h1 className="text-xl">Reject Pandit Application</h1>
                    </div>
                    <div className="py-1 w-100 px-12">
                        <p className="px-12">Please fill the reason</p>
                    </div>
                    <div className="flex py-1">
                        <textarea name="postContent" rows={4} cols={40} />
                    </div>
                </div>
            </div>
            <div className="relative max-auto flex w-11/12 flex-col items-center justify-between text-richblack-500 py-32">
                <Footer/>
            </div>
        </div>
  )
}

export default PanditProfilePage