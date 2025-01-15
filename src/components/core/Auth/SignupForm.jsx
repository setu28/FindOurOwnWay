import React from 'react';
import SignupMentorForm from './SignupMentorForm';
import SignupStudentForm from './SignupStudentForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createUser } from '../../../services/operations/authAPI';
export const SignupForm = () => {

    const [userType, setUserType] = useState("Student");
    const [flag, setFlag] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { email } = useSelector((state) => state.profile);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const [email, setEmail] = useState("set");
    
    
    const [formData, setFormData] = useState({
        email: email.email,
        password: "",
        confirmPassword: "",
      });
      

    const {password, confirmPassword } = formData;
    //const [flag,   setFlag] = useState(true);
    
    const handleOnChange = (e) =>{
        e.preventDefault();
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
        console.log("test",email);
      }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Form Submitted", formData);
        
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if(dispatch(createUser(email, password, confirmPassword,navigate))){
            setFlag(false);
        }
       
        setFormData({
            email: "",
            password: "", 
            confirmPassword: "",
        });
        
    }

    const tabData = [
        {
          id: 1,
          tabName: "Student",
          type: "Student",
        },
        {
          id: 2,
          tabName: "Mentor",
          type: "Mentor",
        },
    ];
    const setAccountType = (type) => {
            setUserType(type);
            //setFlag(false);
    }
    return (
    <div>
        <div className="flex justify-center">
            <div className="w-full max-w-[500px] p-4 lg:p-8">
                { flag ? 
                    ( 
                        <div className="flex flex-col justify-center">
                            <div>
                                <h1 className="text-richblack-40 font-semibold text-[1.875rem] leading-[2.375rem]">
                                    Please Fill the detials 
                                </h1>
                            </div>
                            <div>
                            <form onSubmit={handleSubmit} className="flex">
                                        <div className="flex flex-col">
                                          <div className="pt-4">
                                            <div className='flex flex-col'>
                                            <label className="gap-y-3 gap-x-3">
                                              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
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
                                                className="w-full max-w-[430px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-50"
                                              />
                                            </label>
                                            
                                            <label className="gap-y-3 gap-x-3">
                                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
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
                                              className="w-full max-w-[430px] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                            />
                                            <span
                                              onClick={() => setShowPassword((prev) => !prev)}
                                              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                            >
                                              
                                            </span>
                                            </label>
                                            <label className="gap-y-3 gap-x-3">
                                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
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
                                              className="w-full max-w-[430px] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                            />
                                           
        
                                            
                                            </label>
                                            </div>
                                          </div>
                                          <div className="flex flex-col px-60">
                                                <button
                                                    type="submit"
                                                    className="mt-6 rounded-[8px] bg-yellow-50 py-[4px] px-[4px] font-medium text-richblack-900"
                                                >
                                          Create Account
                                        </button>
                                
                                         </div>
                                         
                                         
                                        </div>
                
                                       
                                </form>
                            </div>
                        </div>
                    ) 
                    : 
                    (
                        <div className="flex flex-col justify-center">
                            <div>
                                <h1 className="text-richblack-12 font-semibold text-[1.875rem] leading-[2.375rem]">
                                    Please select Your Role
                                </h1>
                            </div>
                            <div>
                            <div className="flex flex-row justify-center">
                                <div className="flex flex-row w-full max-w-[500px] p-1 lg:p-6">
                                    {tabData.map((tab) => (
                                    <div key={tab.id} className="flex flex-row gap-x-6 gap-y-3 p-2">
                                        <button
                                            className={`py-[12px] px-[16px] rounded-[8px] font-medium ${userType === tab.type ? 'bg-yellow-500 text-white' : 'bg-yellow-50 text-richblack-900'}`}
                                            onClick={() => setAccountType(tab.type)}
                                        >
                                        {tab.tabName}
                                        </button>
                                    </div>
                                     ))}
                    
                                </div>
                            </div>
                            <div className="flex flex-row">
                                {userType === "Student" ? (<SignupStudentForm />) : ( <SignupMentorForm />)}
                            </div>
                            </div>
                         </div>
                    )
                }
            </div>
        </div>
    </div>
   
  )
}

