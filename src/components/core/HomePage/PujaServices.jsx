import React from 'react';
import { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from '../../common/HighLightText';

const TabsName = [
  "Home Puja",
  "Mandir Puja",
  "Prasad Service"
];

export const PujaServices = () => {

  const [currentTab, setCurrentTab] = useState(TabsName[0]);
  const [services, setServices] = useState(HomePageExplore[0].services);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].services[0].heading);
  console.log(services);
  console.log(currentCard);

  const setMyCards = (value) =>{
    setCurrentTab(value);
    const result = HomePageExplore.filter((services) => services.tag == value);
    setServices(result[0].services);
    setCurrentCard(result[0].services[0].heading);
  }




  return (
    <div>
        <div className='text-3xl font-semibold text-center'>
          We Offer All Kind Of
          <HighLightText text={"Puja Services"}/> 
        </div>

        <div className='mt-5 flex flex-row rounded-full bg-Rose-100 border-Rose-100 px-1 py-1'>
          {
            TabsName.map((element,index)=>{
              return(
                <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium" 
                  : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                  hover:bg-richblack-900 hover:text-richblack-5 px-7 py-7`}
                  key={index}
                  onClick={() => setMyCards(element)}>
                    {element}
                  </div>
              )
            })
          }
        </div>



        <div className='flex flex-col px-2 py-2'>
          {
            services.map((element,index)=> {
              return(
                <div className="flex flex-col px-1 py-2">
                  <div className="flex py-1">
                    {element.heading}
                  </div>
                  <div className="flex py-1">
                    {element.description}
                  </div>
                </div>
              )
            })
          }
        </div>

        
    </div>
  )
}

export default PujaServices
