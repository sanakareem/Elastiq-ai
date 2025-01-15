import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const submitReview = async (text) => {
  const response = await axios.post(`${API_URL}/reviews/`, { text });
  return response.data;
};

export const getReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews/`);
  return response.data;
};