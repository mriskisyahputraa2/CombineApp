import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ onSearchNote, handleClearSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearchNote({ query });
    }
  };
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      handleClearSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    handleClearSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-between items-center w-full mx-auto">
      <input
        type="text"
        placeholder="Search Note"
        className="w-full text-sm bg-transparent py-2 px-3 outline-none"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      {query && (
        <IoMdClose
          className="text-xl text-gray-600 cursor-pointer hover:text-black mr-3"
          onClick={handleClear}
        />
      )}
      <FaMagnifyingGlass
        className="text-gray-600 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
