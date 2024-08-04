import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ onSearch, type }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query === "") {
      onSearch({ query: "", type });
    }
  }, [query, onSearch, type]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch({ query, type });
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch({ query: "", type });
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
        placeholder="Search"
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
    // <div className="flex justify-between items-center w-full mx-auto">
    //   <input
    //     type="text"
    //     placeholder="Search"
    //     className="w-full text-sm bg-transparent py-2 px-3 outline-none"
    //     value={query}
    //     onChange={handleInputChange}
    //     onKeyDown={handleKeyPress}
    //   />
    //   {query && (
    //     <IoMdClose
    //       className="text-xl text-gray-600 cursor-pointer hover:text-black mr-3"
    //       onClick={handleClear}
    //     />
    //   )}
    //   <FaMagnifyingGlass
    //     className="text-gray-600 cursor-pointer hover:text-black"
    //     onClick={handleSearch}
    //   />
    // </div>
  );
};

export default SearchBar;
