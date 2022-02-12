import { createContext } from 'react';

const Store = createContext({
  userInfo: null,
  cartItems: [],
  shippingAddress: {},
  addToCart: (product) => {},
  removeFromCart: (product) => {},
  deleteFromCart: (product) => {},
  saveAddress: (address) => {},
  //auth
  logoutHandler: (address) => {},
  userRegister: (user) => {},
  userLogin: (user) => {},
});

export default Store;
