import React from 'react';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileDropDown = () => {
    const  dispatch  = useDispatch();
    const  navigate  = useNavigate();
    console.log("Profile Drop Down is called");
    return (
    <div className="gap-x-1">
        <button className="rounded-[8px] border border-richblack-700 bg-Orange-400 px-[12px] py-[8px] text-richblack-500" 
        onClick={()=>{
            dispatch(logout(navigate))
        }}>
            Log Out
        </button>


    </div>
  )
}

export default ProfileDropDown
