import React from 'react';
import { useState } from 'react';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../../../services/operations/authAPI';



const SignUpCustomerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accType } = useSelector((state) => state.profile);
  const { userId } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    inputField: "",
  });

  const {inputField} = formData;

  const handleOnChange = (e) =>{
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
    console.log("User Id",userId);

  }
  
  const handleSubmit = (e) =>{
    console.log("Inside handleSubmit",accType);
    e.preventDefault();
    dispatch(createCustomer(navigate,userId));

    setFormData({inputField: "",})

  }


  return (
    
    <div className="flex w-full flex-col items-center">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex w-full flex-row gap-y-1 justify-items-center">
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Input Field 
              </p>
              <input
                required
                type="text"
                name="inputField"
                value={inputField}
                onChange={handleOnChange}
                placeholder="Enter Any Vlaue"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5  gap-y-10"
              />
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

export default SignUpCustomerForm