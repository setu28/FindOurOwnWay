import React from 'react';
import backgroundImage from "../../assets/Images/Pandit1.jpeg";
import lightOrange from "../../assets/Images/lightOrange.webp"
import PujaServices from '../core/HomePage/PujaServices';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setEmail } from '../../slices/profileSlice';

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  token  = useSelector((state) => state.auth.token)
    const  user  = useSelector((state) => state.profile)
    const  emailFlag  = useSelector((state)=> state.profile.email);
    const  accType  = useSelector((state) => state.profile.accType);
    

    const handleChange = (e) =>{
        console.log("We are inside console.log");
        e.preventDefault();
        navigate("/findingPanditPage");
    }

    useEffect(()=>{
        console.log("we are checking token value",token);
        console.log("We are checking account type",accType);
        console.log("We are checking emailFalg",emailFlag);
        if(token===null && accType===null){
            dispatch(setEmail(null));
        }


    },[]);

    return (
    <div>
        {/* Section 1*/}
        
        <div className="flex-wrap px-2 py-1 pb-5"> 
            <div className="bg-local bg-center h-screen max-h-96" style={{backgroundImage: `url(${backgroundImage})`}}>
                    {/* Your content here */}
                    <div className=" pt-36">
                        <div className="group mx-auto mt-1 w-fit rounded-full bg-Orange-400 p-1 font-bold text-richblack-500 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-yellow-900">
                                <button onClick={handleChange}>Find Your Pandit Here</button>
                                    
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            
        {/* Section 2*/}
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-richblack-500 h-96">
            <PujaServices/>
        </div>

        {/*Review Slider to be made */}

        {/* Footer */}
        <div className="relative max-auto flex w-11/12 flex-col items-center justify-between text-richblack-500 py-10">
            <Footer/>


        </div>
    </div>
   
    
  )
}

export default Home
