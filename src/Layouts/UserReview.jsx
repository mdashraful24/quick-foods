import { useState } from "react";


const UserReview = () => {
    const [stars, setStars] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your review!\nStars: ${stars}\nReview: ${review}`);
    setStars('');
    setReview('');
  };
    return (
        <form
      className="p-4 bg-gray-100 rounded-md shadow-md max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-4">Leave a Review</h2>

      {/* Star Rating Input */}
      <div className="mb-4">
        <label htmlFor="stars" className="block font-medium mb-2">
          Stars (Out of 5)
        </label>
        <input
          type="number"
          id="stars"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Review Text Input */}
      <div className="mb-4">
        <label htmlFor="review" className="block font-medium mb-2">
          Your Review (max 100 characters)
        </label>
        <textarea
          id="review"
          maxLength="100"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          required
        ></textarea>
        <p className="text-sm text-gray-500">{100 - review.length} characters remaining</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit Review
      </button>
    </form>
    );
};

export default UserReview;