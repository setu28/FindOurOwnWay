import React from 'react';
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyotp } from '../../services/operations/authAPI';


const VerifyOtp = () => {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.auth);
    const { email } = useSelector((state) => state.profile)

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("email",email);
        dispatch(verifyotp(otp,email,navigate));
    }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="flex place-items-center">

                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                            Verify Email
                        </h1>
                        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                            A verification code has been sent to you. Enter the code below
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                            <input
                                {...props}
                                placeholder="-"
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                                )}
                                containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                                }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                            Verify Email
                        </button>
                    </form>
                </div>
        </div>
  )
}

export default VerifyOtp