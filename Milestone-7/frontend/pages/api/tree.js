import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const saveTree = async (username, treeData) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/trees/${username}`, { username, tree: treeData });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTree = async (username) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/trees/${username}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data.message);
    throw new Error(error.response.data.message);
  } else if (error.request) {
    console.error('Network Error:', error.request);
    throw new Error('Network error. Please try again later.');
  } else {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
};
