import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress } from '../../services/operations/authAPI';

export const AddressPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        addressLine1: "", addressLine2: "",
        place: "",city: "",state: "",
        pincode: "",
    });

    const { addressLine1, addressLine2, place, city, state, pincode} = formData;

    const handleOnChange = (e) =>{
        e.preventDefault();
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name] : e.target.value,
        }))
        console.log("We are in HandleOnChange");
    }

    const handleSubmit = (e) =>{
        console.log("inside hadnle submit",userId);
        e.preventDefault();
        dispatch(createAddress(addressLine1,addressLine2,place,city,state,pincode,userId,navigate));
    }


  return (
    <div className="flex w-full flex-col items-center">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex w-full flex-row gap-y-1 justify-items-center">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center">
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Address Line 1 
              </p>
              <input
                required
                type="text"
                name="addressLine1"
                value={addressLine1}
                onChange={handleOnChange}
                placeholder="Enter Your Address Line1"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5  gap-y-10"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Address Line 2 
              </p>
              <input
                required
                type="text"
                name="addressLine2"
                value={addressLine2}
                onChange={handleOnChange}
                placeholder="Enter Your Address Line2"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Place 
              </p>
              <input
                required
                type="text"
                name="place"
                value={place}
                onChange={handleOnChange}
                placeholder="Enter Your Place"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                City 
              </p>
              <input
                required
                type="text"
                name="city"
                value={city}
                onChange={handleOnChange}
                placeholder="Enter Your City"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                State 
              </p>
              <input
                required
                type="text"
                name="state"
                value={state}
                onChange={handleOnChange}
                placeholder="Enter Your State"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          <label className="flex gap-y-3 gap-x-3">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                PinCode 
              </p>
              <input
                required
                type="number"
                name="pincode"
                value={pincode}
                onChange={handleOnChange}
                placeholder="Enter your PinCode"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>
          

          </div>
           
          

         <div className="flex flex-col px-60">
         <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Save Address
        </button>

         </div>
         
         
        </div>
       
      </form>

      
    </div>
  )
}
