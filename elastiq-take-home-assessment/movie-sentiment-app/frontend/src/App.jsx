import { useState, useEffect } from 'react'
import './App.css'

const API_URL = window.location.hostname === 'frontend-service-utm5.onrender.com' 
  ? 'https://elastiq-ai-backend.onrender.com'
  : 'http://localhost:8000';

function App() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews/`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: review }),
        mode: 'cors'  
      });
      const data = await response.json();
      setResult(data);
      fetchReviews(); 
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing sentiment. Please try again.');  
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Sentiment Analysis Section (UI-1) */}
      <section className="mb-12">
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">
          Analyze sentiment
        </h1>
        <p className="text-gray-600 mb-8">
          Detect the general sentiment expressed in a movie review by using LLM as NLP classifier.
        </p>

        <h2 className="text-3xl text-blue-600 mb-4">movie review</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-4 border rounded-md bg-gray-50"
            rows="6"
            placeholder="Type or paste your movie review here..."
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow">
            <p className="text-lg mb-2">
              This seems like a{' '}
              <span className="font-medium text-green-600">
                {result.sentiment.toLowerCase()}
              </span>{' '}
              review. 😊
            </p>
            <p>
              Sentiment Score:{' '}
              <span className="font-medium text-green-600">
                {(result.confidence * 100).toFixed(1)}% {result.sentiment}
              </span>
            </p>
          </div>
        )}
      </section>

      {/* Review History Section (UI-2) */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Sentiment Analysis History</h2>
          <div className="flex items-center">
            <span className="mr-2">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-1"
              placeholder="Filter reviews..."
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Sentiment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm text-gray-900">{review.text}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full 
                      ${review.sentiment === 'Positive' ? 'bg-green-100 text-green-800' : 
                        review.sentiment === 'Negative' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {review.sentiment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {filteredReviews.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App