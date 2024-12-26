import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { sendotp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) =>{
        setEmail(e.target.value);
        console.log(email);
    }
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(sendotp(email,navigate))
    }

  return (
        <div className="flex place-items-center">
            <form 
                            onSubmit={handleOnSubmit}
                            className="mt-6 flex w-full flex-col gap-y-4">
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-Orange-500">
                                    Email Address <sup className="text-Red-800">*</sup>
                                </p>
                                <input
                                    required
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleOnChange}
                                    placeholder="Enter your email address"
                                    style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                            <button
                                type="submit"
                                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                                Submit
                            </button>
                        </form>
        </div>
    
  )
}

export default VerifyEmail


