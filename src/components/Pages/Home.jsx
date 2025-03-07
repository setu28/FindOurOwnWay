import React from 'react';
import backgroundImage from "../../assets/Images/Pandit1.jpeg";
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setEmail } from '../../slices/profileSlice';
import  ExploreSubjects  from './ExploreSubjects';

export const Home = () => {
    
    const navigate = useNavigate();
    /*
    const dispatch = useDispatch();
    const  token  = useSelector((state) => state.auth.token)
    const  user  = useSelector((state) => state.profile)
    const  emailFlag  = useSelector((state)=> state.profile.email);
    const  accType  = useSelector((state) => state.profile.accType);
    */
    const handleClick = (e) =>{
        e.preventDefault();
        navigate("/createRoadmap");
   }
    

    useEffect(()=>{


    },[]);

    return (
    <div>
        {/* Section 1*/}
        
        <div className="flex-wrap px-2 py-1 pb-5"> 
            <div className="bg-local bg-center h-screen max-h-80">
                    {/* Your content here */}
                    <div className="flex flex-col items-center justify-center h-full text-white">
                        <h1 className="text-4xl font-bold text-black">Welcome to Find Your Own Path</h1>
                        <h2 className="text-3xl font-bold text-black py-2">Gear Up For Your Success</h2>
                        <h3 className="text-2xl font-bold text-black py-2">Follow a RoadMap or Create One</h3>
                        <button className="rounded-[8px] border border-richblack-700 bg-Orange-400 px-[12px] py-[8px] text-richblack-500" onClick={handleClick}>
                            Create Your RoadMap
                        </button>

                    </div>
            </div>
        </div>

        {/* Section 2*/}
        <div>
            <ExploreSubjects/>

        </div>
            
       

       

        {/* Footer */}
        <div className="relative max-auto flex w-11/12 flex-col items-center justify-between text-richblack-500 py-10">
            <Footer/>


        </div>
    </div>
   
    
  )
}

export default Home
