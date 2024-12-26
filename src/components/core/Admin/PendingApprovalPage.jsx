import React from "react";
import Footer from "../../common/Footer";
import { useEffect } from "react";
import { useState } from "react";
import lightOrange from "../../../assets/Images/lightOrange.webp";
import PendingApprovalFilter from "./FilterCmp/PendingApprovalFilter";


const PendingApprovalPage = () => {
    return (
        <>
            {/* Section 1 */}
            <div className="flex-wrap px-2 py-0.5 pb-5"> 
                <div className="bg-local bg-center h-screen max-h-44" style={{backgroundImage: `url(${lightOrange})`}}>
                    {/* Your content here */}
                    <div className="py-5 px-8">
                        <h1 className="px-10 text-center text-2xl">List Of Awaiting Pandits Awaiting Approval</h1>
                        <h2 className="px-10 py-5 text-center">All Pandits Here</h2>
                        <h2 className="px-10 text-center">Apply Filter if required</h2>
                    </div>
                </div>
            </div>

            {/* Section 2 - Filter Will be placed*/}
            <div className="flex-wrap px-14 py-5 pb-2 h-96">
                <PendingApprovalFilter/>

            </div>
            
            {/*Footer */}
            <div className="relative max-auto flex w-11/12 flex-col items-center justify-between text-richblack-500 py-32">
                <Footer/>
            </div>
        </>
  )
}

export default PendingApprovalPage