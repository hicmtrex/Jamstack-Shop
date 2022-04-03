import { createContext } from 'react';

const Store = createContext({
  //auth
  userInfo: null,
  logoutHandler: (address) => {},
  userRegister: (user) => {},
  userLogin: (user) => {},
  //cart
  cartItems: [],
  shippingAddress: {},
  addToCart: (product) => {},
  removeFromCart: (product) => {},
  deleteFromCart: (product) => {},
  saveAddress: (address) => {},
  //orders
  getUserOrders: () => {},
});

export default Store;
