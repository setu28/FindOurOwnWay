import React from 'react';
import { FilterMechanism } from './FilterMechanism';
import { FaSearch } from "react-icons/fa";
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { useEffect } from 'react';
import { getALLPublishedRoadMap } from '../../../services/operations/roadMapSubject';

export const MainLandingPage = () => {
  const [allRoadMapData, setAllRoadMapData] = useState([])
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await getALLPublishedRoadMap();
        if(res){

        }
      } catch (error) {
        console.log("error",error);
      }
    }
    fetchData();
  }
  ,[]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (query) => {
    setSearchTerm(query);
    console.log("Searching for:", query);
  };
  return (
    <div className="flex flex-row">
        {/* Main Component Section 1*/}
        

        {/* Filter Mechanism */}
        <div>
            <h2>Filter Section</h2>

        </div>
        <div className="flex w-full flex-col items-center">
            {/* Section Search Bar */}
            <div className="flex flex-col">
              
              <div className="p-5">
                  <SearchBar onSearch={handleSearch} />
                  {searchTerm && <p>Results for: {searchTerm}</p>}
               </div>
               <div>
                 <h1>TAgs Section</h1>
               </div>
              
            </div>

            {/* Section of Displaying RoadMaps */}
            <div>

            </div>

        </div>

    </div>
  )
}
