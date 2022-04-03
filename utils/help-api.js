import axios from 'axios';

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1337'
    : 'https://jamstackshop-server.herokuapp.com';

export const getProducts = async () => {
  const { data } = await axios.get(`${baseUrl}/products`);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/products/${id}`);
  return data;
};

export const setError = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

/**
 * Given a image object return the proper path to display it
 * Provides a default as well
 * @param {any} image
 */
export const fromImageToUrl = (image) => {
  if (!image) {
    return '/vercel.svg'; //Or default image here
  }
  if (image.url.indexOf('/') === 0) {
    //It's a relative url, add API URL
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
