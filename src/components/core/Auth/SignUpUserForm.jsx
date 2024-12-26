import React from 'react';
import { useState } from 'react';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tab from '../../common/Tab';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from 'react-hot-toast';
import { createUser } from '../../../services/operations/authAPI';

const SignUpUserForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.profile);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.CUSTOMER);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    email: email.email,
    password: "",
    confirmPassword: "",
  });
  const {firstName, middleName, lastName, gender, phoneNumber, password, confirmPassword} = formData;

  const handleOnChange = (e) =>{
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if( password != confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    console.log("Checking account Type",accountType);
    console.log("Confirming data",email.email);
    
    console.log("Confirm data",email);
    
    dispatch(createUser(
      accountType,firstName,middleName,
      lastName,gender,phoneNumber,email,
      password,confirmPassword,navigate
    ));
    
    setFormData({
      firstName: "", middleName: "", lastName: "",
      gender: "", phoneNumber: "", email: email,
      password: "", confirmPassword: "",
    })
    
    setAccountType(ACCOUNT_TYPE.CUSTOMER);


   
  }
  //Data to be passed to Tab Component
  const tabData = [
    {
      id: 1,
      tabName: "Customer",
      type: ACCOUNT_TYPE.CUSTOMER,
    },
    {
      id: 2,
      tabName: "Pandit",
      type: ACCOUNT_TYPE.PANDIT,
    },
  ]


  return (
    <div className="flex w-full flex-col items-center">
      {/*Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex w-full flex-row gap-y-1 justify-items-center">
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                First Name 
              </p>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5  gap-y-10"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Middle Name 
              </p>
              <input
                required
                type="text"
                name="middleName"
                value={middleName}
                onChange={handleOnChange}
                placeholder="Enter middle name"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Last Name 
              </p>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-4 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Gender 
              </p>
              <input
                required
                type="text"
                name="gender"
                value={gender}
                onChange={handleOnChange}
                placeholder="Enter Gender"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>

          </div>
           
          <div className="flex flex-row justify-center pt-12">
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Phone Number 
              </p>
              <input
                required
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleOnChange}
                placeholder="Enter Phone Number"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email 
              </p>
              <input
                required
                type="Email"
                name="email"
                value={email.email}
                onChange={handleOnChange}
                placeholder=""
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password 
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="flex gap-y-3 gap-x-3">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password 
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          </div>

         <div className="flex flex-col px-60">
         <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>

         </div>
         
         
        </div>
       
      </form>

      
    </div>
  )
}

export default SignUpUserForm