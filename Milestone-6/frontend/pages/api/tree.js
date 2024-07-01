// api/tree.js
import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3001';

export const saveTree = async (username, treeData) => {
  const response = await axios.post(`${apiBaseUrl}/trees/${username}`, { tree: treeData });
  return response.data;
};

export const getTree = async (username) => {
  const response = await axios.get(`${apiBaseUrl}/trees/${username}`);
  return response.data;
};
