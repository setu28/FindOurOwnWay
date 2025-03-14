import React, { useState, useEffect } from 'react';
import { FilterMechanism } from './FilterMechanism';
import { SearchBar } from './SearchBar';
import { getALLPublishedRoadMap } from '../../../services/operations/roadMapSubject';
import { RoadMapSubjectModal } from './RoadMapSubjectModal';

export const MainLandingPage = () => {
  const [allRoadMapsData, setAllRoadMapsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getALLPublishedRoadMap();
        if (res) {
          console.log("All the Published roadMap", res);
          setAllRoadMapsData(res);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="flex min-h-screen pt-16 bg-Rose-50">
      {/* Left Sidebar (Filter) */}
      <div className="w-1/4 min-w-[250px] h-full bg-gray-100 p-5 sticky top-16 overflow-y-auto shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filter Section</h2>
        <FilterMechanism />
      </div>

      {/* Main Content (Search & RoadMaps) */}
      <div className="flex flex-col w-full p-5">
        {/* Centered Search Bar */}
        <div className="w-full flex justify-center mb-5">
          <SearchBar onSearch={handleSearch} />
        </div>

        {searchTerm && <p className="text-gray-600 text-center">Results for: <strong>{searchTerm}</strong></p>}

        {/* RoadMap Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRoadMapsData.map((roadMap) => (
            <div key={roadMap._id} className="p-4 bg-white rounded-lg shadow-md">
              <RoadMapSubjectModal roadMap={roadMap} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
