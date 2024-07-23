import React from "react";

const ProfileInfo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
        <h3 className="text-gray-900 dark:text-white">MRS</h3>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Muhammad Rizki Syahputra
        </p>
        <button className="text-sm text-blue-600 dark:text-blue-400 underline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
