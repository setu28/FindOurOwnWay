import React from 'react';
import { useState } from 'react';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPandit } from '../../../services/operations/authAPI';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Input, Page, setOptions } from '@mobiscroll/react';
import { createAvailability } from '../../../services/operations/Availability';
import { toast } from 'react-hot-toast';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});


const SignUpPanditForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.profile);
  const [myValue, setMyValue] = useState([]);
  const changeMyValue = (ev) => setMyValue(ev.value);
  const [formData, setFormData] = useState({
    educationalBackground: "",
    languages: "",
    experience: "",
    about: "",
  });
  const { educationalBackground, languages, experience, about} = formData;

  const handleOnChange = (e) =>{
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("User Id is ",userId);
    if(!myValue){
      toast.error("Please fill your availability");
    }
    else{
      dispatch(createPandit(
        educationalBackground,languages,
        experience, about,userId,myValue,navigate
      ));
      console.log("After disptact");
      setFormData({
        educationalBackground: "", languages: "",
        experience: "", about: "",
      })

    }
    
  }

  return (
    <div className="flex w-full flex-col">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex w-full flex-row gap-y-1">
        <div className="flex gap flex-col">
          <div className="flex flex-row py-10">
              <label className="flex gap-y-3 gap-x-3">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Educational Background 
                  </p>
                  <input
                    required
                    type="text"
                    name="educationalBackground"
                    value={educationalBackground}
                    onChange={handleOnChange}
                    placeholder="Enter Your Educational Background"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5  gap-y-10"
                  />
              </label>
              <label className="flex gap-y-3 gap-x-3">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Languages 
                  </p>
                  <input
                    required
                    type="text"
                    name="languages"
                    value={languages}
                    onChange={handleOnChange}
                    placeholder="Enter Languages you know"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
              </label>
              <label className="flex gap-y-3 gap-x-3">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      Experience 
                  </p>
                  <input
                    required
                    type="number"
                    name="experience"
                    value={experience}
                    onChange={handleOnChange}
                    placeholder="Enter your experience"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
              </label>
              <label className="flex gap-y-4 gap-x-3">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      About 
                  </p>
                  <input
                    required
                    type="text"
                    name="about"
                    value={about}
                    onChange={handleOnChange}
                    placeholder="Enter Something about you"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
              </label>
          </div>
          <div className="flex flex-row px-10 py-5">
            <p>Please enter your Tentative avaialability</p>

          </div>
          <div className="flex flex-col px-60 py-5 justify-items-center">
            <Datepicker
              controls={['calendar', 'timegrid']}
              select="range"
              display="inline"
              touchUi={true}
              value={myValue}
              onChange={changeMyValue}
            />
          </div>
          <div className="flex flex-col px-60 py-30">
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

export default SignUpPanditForm