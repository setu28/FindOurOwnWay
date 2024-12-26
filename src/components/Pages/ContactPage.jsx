
import React from 'react';
import { ContactUsForm } from '../ContactPage/ContactUsForm';
import Footer from '../common/Footer';
export const ContactPage = () => {
  return (
    <div>
      <div className="relative mx-auto mt-20 flex w-5/12 max-w-maxContent flex-col items-center  justify-between gap-10 text-black">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
            <h1 className="text-center text-2xl font-semibold mt-8">Contact Us</h1> 
         
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactUsForm/>
          
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8  text-black">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from our Customers
        </h1>
        {/* <ReviewSlider /> */}
      </div>
      <Footer />
    </div>
  )
}
