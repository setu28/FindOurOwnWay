import React from 'react';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
      };
    
  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <FaSearch className="w-5 h-5 text-gray-500" />
      </button>
    </form>
  )
}
