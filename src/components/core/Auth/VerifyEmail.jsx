import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { sendotp } from '../../../services/operations/authAPI';
import VerifyOtp from '../../Pages/VerifyOtp';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

    const [email, setEmail] = useState("");
    const [flagone, setFlagone] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) =>{
        setEmail(e.target.value);
        console.log(email);
    }
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(sendotp(email,navigate))
        setFlagone(true);
    }

  return (
        <div className="flex justify-center items-start min-h-screen pt-10 py-4">
            { flagone ? (
                <div className="w-full max-w-md p-8 bg-gray-800 shadow-md">
                    <h1>Register Yourself</h1>
                    <form 
                        onSubmit={handleOnSubmit}
                        className="flex w-full flex-col gap-y-1 py-10">
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
                            Get OTP
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <VerifyOtp />
                </div>
            )}
        </div>
    )
}

export default VerifyEmail


