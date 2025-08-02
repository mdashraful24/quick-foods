import React from "react";

const ConsumerProfile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            className="w-32 h-32 rounded-full border-2 border-blue-500"
            src="https://via.placeholder.com/150" // Placeholder image
            alt="Profile"
          />
        </div>

        {/* Consumer Details */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">johndoe@example.com</p>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex flex-col gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
            Update Profile
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;
