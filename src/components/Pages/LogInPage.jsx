import React from 'react'
import LogInForm from '../core/Auth/LogInForm'


const LogInPage = () => {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-Orange-500">
              Welcome Back
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">Please enter your credentials</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                
              </span>
            </p>
            {<LogInForm />}
          </div>
        </div>
    </div>
  )
}

export default LogInPage