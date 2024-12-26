import React from 'react';
import panditImage from "../../../../assets/Images/pandit.jpg";
import Shimmer from "../../../common/Shimmer";
import { Link } from 'react-router-dom';
import PanditProfilePage from './PanditProfilePage';

const NonApprovedPanditsDetailsList = ({details,userdata,number}) => {
 
  return !details ? (<Shimmer/>) : (
    <div className="flex flex-col px-2 h-56 py-5">
      <Link to={`/home/Admin/Pandit/ProfileView/${details._id}`}>
        <img src={panditImage}/>
        <h1>Name: {userdata[number]?.firstName} {userdata[number]?.lastName}</h1>
        <p>Educational Background: {details?.educationalBackground}</p>
        <p>Exprience: {details?.experience}</p>
        <p>Rating: {details?.ratingAndReviews?.rating}</p>
      </Link>
    </div>
  )
}

export default NonApprovedPanditsDetailsList