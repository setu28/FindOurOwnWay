
import React from 'react';
import Footer from '../common/Footer';
import lightOrange from "../../assets/Images/lightOrange.webp";
import backgroundImage from "../../assets/Images/Pandit1.jpeg";
import FilterAndPdView from '../core/HomePage/FilterAndPdView';


const FindPanditPage = () => {
    
  return (
    <>
    {/* Section 1 */}
    <div className="flex-wrap px-2 py-0.5 pb-5"> 
        <div className="bg-local bg-center h-screen max-h-44" style={{backgroundImage: `url(${lightOrange})`}}>
            {/* Your content here */}
            <div className="py-5 px-8">
                <h1 className="px-10 text-center">Welcome to Find My Pandit </h1>
                <h2 className="px-10 py-5 text-center">All the available pandits</h2>
                <h2 className="px-10 text-center">Apply Filter according to your location</h2>
            </div>
        </div>
    </div>

    {/* Section 2 - Filter Will be placed*/}
    <div className="flex-wrap px-14 py-5 pb-2 h-96">
        <FilterAndPdView/>
        
    </div>

    {/* Section 3 - PanditLoading */}
    <div>

    </div>

    {/*Footer */}
    <div className="relative max-auto flex w-11/12 flex-col items-center justify-between text-richblack-500 py-32">
        <Footer/>
    </div>
    
    </>
  )
}

{/*<div className=" pt-36">
                        <div className="group mx-auto mt-1 w-fit r bg-Orange-400 p-1 font-bold text-richblack-500 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                            <div className="flex flex-row items-center gap-2 px-10 py-[5px] transition-all duration-200 group-hover:bg-yellow-900">
                                <p>Welcome to My Find My Pandit</p>
                            </div>
                            <div>
                                <p>All the available Pandits</p>
                            </div>
                            <div>
                                <p>Apply filter according to your location</p>
                            </div>
                        </div>
                    </div> */}
export default FindPanditPage