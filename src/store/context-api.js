import { createContext } from 'react';

const Store = createContext({
  cartItems: [],
  shippingAddress: {},
  addToCart: (product) => {},
  removeFromCart: (product) => {},
  deleteFromCart: (product) => {},
  saveAddress: (address) => {},
  logoutHandler: (address) => {},
});

export default Store;
