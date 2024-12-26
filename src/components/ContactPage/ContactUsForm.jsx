import React from 'react';
import {useForm} from "react-hook-form";
import { useEffect, useState } from 'react';
import { submitCustomerQuery } from '../../services/operations/customerQuery';
import { toast } from 'react-hot-toast';

export const ContactUsForm = () => {

    const [loading,setLoading]=useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    }=useForm();
    const submitContactForm = async(data)=>{
        try {
            console.log("Lets see data",data);
            const res = await submitCustomerQuery(data);
            if(res){
                toast.success("Query Submitted");
            }
            //console.log("We are isnide",res);
        } catch (error) {
            console.log("We are giving error");
            toast.error("Something went wrong");
            
        }
    }
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                name:"",
                message:"",
                phonenumber:"",
            })
        }
    },[reset,isSubmitSuccessful]);
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-14'>
           
                {/* First Name */}
                <div className='flex flex-col'>
                    <label htmlFor='name'>First Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter first name'
                        className='text-Orange-500'
                        {...register("name", {required:true})}

                    />
                    {
                        errors.firstname && (
                            <span>
                                Enter Your First Name
                            </span>
                        )
                    }
            </div>
            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your email'
                    className='text-Orange-500'
                    {...register("email" ,{required: true})}
                />
                {
                    errors.email && (
                        <span>
                            Enter your email 
                        </span>
                    )
                }
            </div>

            {/* phone No */}
            <div className='flex flex-col'>
                <label htmlFor='phonenumber'>Phone Number</label>
                <input
                    type='number'
                    name='phonenumber'
                    id='phonenumber'
                    placeholder='Enter your Phone Number'
                    className='text-Orange-500'
                    {...register("phonenumber",{required: true})}
                />
                {
                    errors.phonenumber && (
                        <span>
                            Enter your Phone Number
                        </span>
                    )
                }
            </div>

            {/* Message */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message</label>
                <input
                    type='text'
                    name='message'
                    id='message'
                    placeholder='Enter your message'
                    className='text-Orange-500'
                    {...register("message",{required: true})}
                />
                {
                    errors.message && (
                        <span>
                            Enter your Message
                        </span>
                    )
                }
            </div>
            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'>
                    Send Message
            </button>

        </div>

    </form>
    
  )
}
