import React from 'react';
import { useForm } from 'react-hook-form';



const SignupMentorForm = () => {
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      console.log(data);
    }
  
  return (
    <div className="flex w-full flex-col items-center">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4">
          <div>
          <label className="block text-gray-700">First Name</label>
          <input
            {...register("firstName", {
              required: "First Name is required",
              maxLength: {
                value: 8,
                message: "First Name cannot exceed 2 characters",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
          </div>
          <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            {...register("lastName", {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Last Name must only contain letters",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
          </div>
          <div>
          <label className="block text-gray-700">Gender</label>
          <select
            {...register("gender")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          >
            <option value="A">Category A</option>
            <option value="B">Category B</option>
          </select>
          </div>
          <div>
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            {...register("age", {
              min: {
                value: 10,
                message: "Age must be at least 5",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
          </div>
          <div>
          <label className="block text-gray-700">Experience</label>
          <input
            type="number"
            {...register("experience", {
              min: {
                value: 0,
                message: "Age must be at least 10",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience.message}</p>
          )}
          </div>
          <div>
          <input
            type="submit"
            className="mt-1 block w-full px-3 py-2 bg-black text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          </div>
      </form>
    </div>
  )
}

export default SignupMentorForm