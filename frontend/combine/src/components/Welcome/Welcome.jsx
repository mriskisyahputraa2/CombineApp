import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <h2 className="text-xl text-gray-700">
        Welcome <strong className="text-gray-900">{user && user.name}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
