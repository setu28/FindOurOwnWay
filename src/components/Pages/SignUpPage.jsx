import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerifyEmail from '../core/Auth/VerifyEmail';
import SignUpUserForm from '../core/Auth/SignUpUserForm';
import SignUpCustomerForm from '../core/Auth/SignUpCustomerForm';
import SignUpPanditForm from '../core/Auth/SignUpPanditForm';




const SignUpPage = () => {
    const { email } = useSelector((state) => state.profile);
    const { accType } = useSelector((state) => state.profile);
    const { userFlag } = useSelector((state) => state.profile);
    
    console.log(userFlag);
    console.log(email);
    

  return (
    <div className="grid gap-y-24 place-items-center">
        <h1>You are in SignUp Page</h1>
        { userFlag ? (
          <SignUpCustomerForm/>
        ) : (
          email ? (
            <SignUpUserForm/>
  
          ) : (
            <VerifyEmail/>
          )

        )}
        



       
        
        <div>
        <h2>ENd of Sign Up Page</h2>

        </div>
        
    </div>
    
    
  )
}

export default SignUpPage