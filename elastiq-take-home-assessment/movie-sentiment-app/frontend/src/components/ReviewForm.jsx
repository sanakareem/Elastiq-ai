import React, { useState } from 'react';
import { submitReview } from '../services/api';

const ReviewForm = ({ onReviewSubmitted }) => {
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await submitReview(review);
      onReviewSubmitted(result);
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Movie Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;