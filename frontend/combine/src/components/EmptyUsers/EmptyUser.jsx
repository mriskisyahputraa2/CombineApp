import React from "react";
import addUserImg from "../../assets/images/add-users.png";
const EmptyUser = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 rounded-lg">
        <img
          className="w-40 h-40 object-cover mb-4"
          src={addUserImg}
          alt="No notes"
        />
        <p className="text-center text-lg font-semibold mb-4">
          Start adding Users!
        </p>
        <p className="text-center text-gray-500 text-sm">
          Click the 'Add User' button to add a user. Let's get started! Let's
          get started!
        </p>
      </div>
    </>
  );
};

export default EmptyUser;
