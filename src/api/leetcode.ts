import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const leetcodeApi = axios.create({
  baseURL: API_URL,
});

export const getLeetcodeStats = async () => {
  try {
    const response = await leetcodeApi.get('/api/leetcode/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching Leetcode stats:', error);
    return {
      totalSolved: 0,
    };
  }
};
