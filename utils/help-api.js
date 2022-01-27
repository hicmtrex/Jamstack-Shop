import axios from 'axios';
export const baseUrl = 'https://strapi-testhicm.herokuapp.com';

export const getProducts = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:1337/api/varients?populate=*'
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get(
      'https://strapi-testhicm.herokuapp.com/api/products?populate=*'
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://strapi-testhicm.herokuapp.com/api/products/${id}?populate=*`
    );
    return data;
  } catch (error) {
    return error;
  }
};
