import { Link, useParams } from 'react-router-dom';

const PaySuccess = () => {
    const {tranId} = useParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
          <p className="text-gray-600 mt-2">Thank you for your payment.</p>
          <div className="bg-gray-100 text-gray-800 mt-4 p-3 rounded-lg">
            <span className="font-medium">Transaction ID:</span> <br />
            <span className="text-sm font-mono">{tranId}</span>
          </div>
          <br />
          <Link to={'/'}
            
            className="mt-6 px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaySuccess;