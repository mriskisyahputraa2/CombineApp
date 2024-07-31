import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value }) => {
  return (
    <>
      <div className="flex justify-between items-center w-full mx-auto">
        <input
          type="text"
          placeholder="Search Note"
          className="w-full text-sm bg-transparent py-2 px-3 outline-none"
        />
        {value && (
          <IoMdClose
            className="text-xl text-white cursor-pointer hover:text-black mr-3"
            // onClick={onClearSearch}
          />
        )}
        <FaMagnifyingGlass
          className="text-slate-400 cursor-pointer hover:text-black"
          // onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchBar;
