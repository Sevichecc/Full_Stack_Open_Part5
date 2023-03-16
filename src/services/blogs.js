import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken };
