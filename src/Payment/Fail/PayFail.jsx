import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PayFail = () => {
    // const {tranId} = useParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M12 2a10 10 0 1010 10A10 10 0 0012 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Failed</h2>
          <p className="text-gray-600 mt-2">Unfortunately, your payment could not be processed.</p>
          <br />
          <Link
            to={'/order'}
            className="mt-6 px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition duration-200"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PayFail;