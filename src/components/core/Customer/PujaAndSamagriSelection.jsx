import React from 'react';
import Footer from '../../common/Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllPanditAssociatedPujaNames } from '../../../services/operations/pujaDetails';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import pujaImage from "../../../assets/Images/PujaName.png";

export const PujaAndSamagriSelection = () => {
    const [Response, setResponse] = useState([]);
    const { panditId } = useParams();
    const getData = async()=>{
        try {
            const res = await getAllPanditAssociatedPujaNames(panditId);
            if(res){
                setResponse(res);
                console.log("We are puja Name details",res);
            }
        } catch (error) {
            console.log("We are running into error",error);
            toast.error("Unable to fetch details");
        }
    }
    useEffect(()=>{
        getData();
    },[])


  return (
    <div className="flex flex-col">
        {/* First Head Section */}
        <div className="flex flex-row justify-center items-center h-44">
            <div className="flex flex-col px-72">
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl">Please Select The Puja Name From The Options Below</h1>
                </div>
                <div className="flex justify-center items-center py-2">
                    <p>Select The Samagri Checkbox If The Pandit Should Arrange It</p>
                </div>
            </div>
        </div>

        {/* Second Section Of the Page 

        <div className="flex flex-row py-6">
            {Response?.map((data)=>(
                <div className="flex flex-col px-2 h-56 py-5">
                    <img src={pujaImage}/>
                    <h1>Name : </h1>
                    <h1>Price: </h1>
                    <h1>Preferrable Dates: </h1>
                    <p>Samagri: </p>
                </div>
            ))}

        </div>
        */}
    </div>
  )
}
