import React, { useEffect, useState } from 'react';
import panditImage from "../../../assets/Images/pandit.jpg";
import Shimmer from '../../common/Shimmer';
import { Link } from 'react-router-dom';


const PanditDetails = ({details}) => {
  //const [res,setRes] = useState(details);
  //console.log("hello",res);
 
  
 
  return !details ? (
    <Shimmer/>
  ) :(
    <div className="flex flex-col px-2 h-56 py-5">
      <Link to={`/home/findingPanditPage/${details._id}`}>
        <img src={panditImage}/>
        <h1>Name: {details?.user?.firstName} {details?.user?.lastName}</h1>
        <p>Educational Background: {details?.educationalBackground}</p>
        <p>Exprience: {details?.experience}</p>
        <p>Rating: {details?.ratingAndReviews?.rating}</p>
      </Link>
    </div>
  )
}

export default PanditDetails