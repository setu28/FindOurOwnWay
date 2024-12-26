import React from "react";
import Footer from "../../common/Footer";
import { UseSelector } from "react-redux";
import Navbar from "../../common/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import backgroundImage from "../../../assets/Images/AdminBGD.jpg";
import { getNonApprovedPanditCount } from "../../../services/operations/panditDetailsAPI";
import { Link } from "react-router-dom";



export const HomePageAdmin = () => {
    const [pendingApprovals , setPendingApprovals] = useState([]);
    const [upcomingEvents , setUpcomingEvents] = useState([]);
    const getdata = async()=>{
        try {
            console.log("We are inside getData useEffect");
            const result = await getNonApprovedPanditCount();
            if(result){
                console.log(result);
                setPendingApprovals(result);
            }
        } catch (error) {
            console.log("Error",error);
        }
    }
    useEffect(()=>{
        getdata();
    },[]);
    return (
    <> 
        <div className="flex-wrap px-2 py-1 pb-5"> 
            <div className="bg-local bg-center h-screen max-h-96" style={{backgroundImage: `url(${backgroundImage})`}}>
                    {/* Your content here */}
                    <div className=" pt-36">
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl">Welcome Back!</h1>
                            <Link to={`/home/Admin/PendingApproval`}>
                                <h2>Total Number Of Pending Approvals {pendingApprovals}</h2>
                            </Link>
                            <h3>No Of Upcoming Events </h3>
                        </div>
                    </div>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
    </>
  )
}
