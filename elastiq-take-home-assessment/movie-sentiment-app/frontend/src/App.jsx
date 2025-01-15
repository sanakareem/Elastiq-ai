import { useState } from 'react'
import './App.css'

function App() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ text: review }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Movie Review Sentiment Analysis
          </h1>
          <p className="text-gray-300">
            Enter your movie review below to analyze its sentiment
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                Your Review
              </label>
              <div className="mt-1">
                <textarea
                  id="review"
                  rows="4"
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Type your movie review here..."
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Analyzing...' : 'Analyze Sentiment'}
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-xl p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Result</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Sentiment</h3>
                <p className={`mt-1 text-2xl font-semibold ${getSentimentColor(result.sentiment)}`}>
                  {result.sentiment}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Confidence</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Review</h3>
              <p className="mt-1 text-gray-900">{result.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App