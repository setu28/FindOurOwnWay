import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/logo.png"
import  ProfileDropDown  from '../core/Auth/ProfileDropDown'
import { useSelector } from 'react-redux';
import { useState } from 'react';


export default function Navbar() {

    const  token  = useSelector((state) => state.auth.token)
    const { user } = useSelector((state) => state.profile)
    const  emailFlag  = useSelector((state)=> state.profile.email);
    const { accType } = useSelector((state) => state.profile)
    const flag = useState(false);
    useEffect(()=>{
        console.log("Checkig token value",token);
    },[])

   
    console.log("Value of Token",token);

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-Rose-100 transition-all duration-200`}>


        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
            {/* Logo */}
            <Link to="/">
                <img src={logo} alt="Logo" width={160} height={32} loading="lazy"/>
            </Link>
            
            {/* Navigation Link */}
            <nav className="md:block">
                <ul className="flex gap-x-6 text-richblack-25">
                    <li className="flex rounded-lg bg-Orange-400 text-richblack-500 pr-5 pl-5 pt-2 pb-2">Home</li>
                    <Link to="/ContactUs">
                    <li className="flex rounded-lg bg-Orange-400 text-richblack-500 pr-5 pl-5 pt-2 pb-2">Contact Us</li>

                    </Link>
                    
                    <li className="flex rounded-lg bg-Orange-400 text-richblack-500 pr-5 pl-5 pt-2 pb-2"> Become A Pandit</li>
                </ul>
            </nav>

            {/* Button */}
            <div className="hidden items-center gap-x-1 md:flex">


            {token === null  && emailFlag === null &&  ( 
                <Link to="/login">
                    <button className="rounded-[8px] border border-richblack-700 bg-Orange-400 px-[12px] py-[8px] text-richblack-500">
                        Log in
                    </button>
                </Link>
            )}

            {token === null  && emailFlag === null && (
                <Link to="/signup">
                    <button className="rounded-[8px] border border-richblack-700 bg-Orange-400 px-[12px] py-[8px] text-richblack-500">
                        Sign up
                    </button>
                </Link>
            )}

            {token !== null  && <ProfileDropDown/>}


            </div>
        </div>

    </div>
  )
}

