import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Tab from '../../common/Tab';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { login } from '../../../services/operations/authAPI';


function LogInForm () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [accountType, setAccountType] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const {email, password} = formData;

  const handleOnChange = (e) =>{
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name] : e.target.value,
    }))
    
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();

    dispatch(login(email,password,accountType,navigate))
  }

  const tabData = [
    {
      id: 1,
      tabName : "Customer",
      type: ACCOUNT_TYPE.CUSTOMER,
    },
    {
      id: 2,
      tabName : "Pandit",
      type: ACCOUNT_TYPE.PANDIT,
    },
    {
      id: 3,
      tabName : "Admin",
      type: ACCOUNT_TYPE.ADMIN,
    }
  ]
  return (
   <div>
    {/* Tab */}
    <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

    {/* Form */}
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
          placeholder="Enter your email"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-Orange-500">
          Password <sup className="text-pink-900">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter your password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={()=> setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :
          (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
        }
        </span>
        <Link to="/forgetPassword">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
    </div>
  )
}

export default LogInForm