import { useState } from "react";
import axios from "axios";

const OrderDetails = ({ packageDetails }) => {
  window.scrollTo(0, 0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    paymentPlan: "Per Piece",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleOrder = () => {
    setIsFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculatePrice = () => {
    const { paymentPlan } = formData;
    const pricePerPerson = packageDetails.price;

    switch (paymentPlan) {
      case "Daily":
        return pricePerPerson * 1;
      case "Weekly":
        return pricePerPerson * 7;
      case "Monthly":
        return pricePerPerson * 30;
      default: // Per Piece
        return pricePerPerson;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = calculatePrice();
    const orderData = {
      phone: formData.phoneNumber,
      address: formData.address,
      packageName: packageDetails.name,
      paymentPlan: formData.paymentPlan,
      totalPrice,
    };

    axios
      .post(
        "https://quick-foods-server.vercel.app/order",
        orderData
      )
      .then((res) => {
        setSubmittedData({ ...orderData, url: res.data.url });
        setIsFormOpen(false);
        window.location.replace(res.data.url);
      });
  };

  return (
    <div className="shadow-xl rounded-xl p-6 flex flex-col justify-between min-h-[300px]">
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          {packageDetails.name}
        </h2>
        <p className="text-lg font-medium mb-3"><span className="text-2xl font-bold">৳</span>{packageDetails.price || "N/A"} per person
        </p>
        <div className="flex flex-col mb-5">
          <p className="text-lg font-semibold">Items Included:</p>
          <ul className="list-disc pl-6">
            {packageDetails.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleOrder}
        className="w-full btn bg-[#E23744] hover:bg-[#d1303e] text-base text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out"
      >
        Order Now
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 px-2 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all duration-300">
            <h3 className="text-xl md:text-3xl text-center font-bold mb-6">
              Enter Order Details
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block font-medium">
                  Payment Plan
                </label>
                <select
                  defaultValue=""
                  name="paymentPlan"
                  // value={formData.paymentPlan}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="" disabled>Select option</option>
                  <option value="Per Piece">Per Piece</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="flex justify-between items-center gap-4 flex-col md:flex-row">
                <button
                  type="submit"
                  className="w-full bg-[#E23744] text-white py-3 px-6 font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="w-full bg-gray-300 py-3 px-6 font-bold rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out mt-2 md:mt-0"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
