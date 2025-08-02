import React, { useState } from "react";

const ProviderProfile = () => {
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  const handleViewOrders = () => {
    fetch("https://quick-foods-server.vercel.app/catering/orders", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data); // Store the fetched data in state
        setShowOrders(true); // Show the orders section
      })
      .catch((err) => ale("Error fetching orders:", err));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mb-6">
        {/* Provider Profile Section */}
        <div className="flex justify-center mb-4">
          <img
            className="w-32 h-32 rounded-full border-2 border-purple-500"
            src="https://via.placeholder.com/150"
            alt="Provider"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Chef Delight Catering
          </h2>
          <p className="text-gray-600 mt-2">
            Professional catering services for all occasions.
          </p>
        </div>
        <div className="mt-4 text-gray-700">
          <p>
            <strong>Location:</strong> 123 Food Street, Culinary City
          </p>
          <p>
            <strong>Contact:</strong> info@chefsdelight.com
          </p>
          <p>
            <strong>Phone:</strong> (555) 123-4567
          </p>
        </div>
        <div className="mt-6">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow w-full"
            onClick={handleViewOrders}
          >
            View All Orders
          </button>
        </div>
      </div>

      {/* Orders Section */}
      {showOrders && (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Orders</h3>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="mb-4 border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <p>
                  <strong>Package:</strong> {order.packageName}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;
