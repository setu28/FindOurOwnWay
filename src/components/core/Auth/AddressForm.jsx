import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createAddress } from '../../../services/operations/authAPI';
const AddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId }  = useSelector((state) => state.profile);
  const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        console.log("We are inside submit function",userId);
        dispatch(createAddress(data.AddressLine1,data.AddressLine2,data.City,data.State,data.Pincode,userId,navigate));

      }
    
    return (
      <div className="flex w-full flex-col items-center">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4">
          {/* Fist Name */}
          <div>
          <label className="block text-gray-700">AddressLine 1</label>
          <input
            {...register("AddressLine1", {
              required: "First Name is required",
              maxLength: {
                value: 10,
                message: "Address Line 1 cannot exceed 10 characters",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          />
          {errors.AddressLine1 && (
            <p className="text-red-500 text-sm">{errors.AddressLine1.message}</p>
          )}
          </div>

          {/* Last Name */}
          <div>
          <label className="block text-gray-700">AddressLine 2</label>
          <input
            {...register("AddressLine2", {
              required: "Adress Line 2 is required",
              maxLength: {
                value: 10,
                message: "Address Line 2 cannot exceed 10 characters",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          />
          {errors.AddressLine2 && (
            <p className="text-red-500 text-sm">{errors.AddressLine2.message}</p>
          )}
          </div>

          {/* City*/}
          <div>
          <label className="block text-gray-700">City</label>
          <select
            {...register("City")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          >
            <option value="A">Category A</option>
            <option value="B">Category B</option>
          </select>
          </div>

          {/* State */}
          <div>
          <label className="block text-gray-700">State</label>
          <select
            {...register("State")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          >
            <option value="A">Category A</option>
            <option value="B">Category B</option>
          </select>
          </div>

          {/* Pincode */}
          <div>
          <label className="block text-gray-700">Pincode</label>
          <input
            type="Pincode"
            {...register("Pincode", {
              min: {
                value: 5,
                message: "Pincode must be at least 5",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          />
          {errors.Pincode && (
            <p className="text-red-500 text-sm">{errors.Pincode.message}</p>
          )}
          </div>

          {/* Submit */}
         
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

export default AddressForm