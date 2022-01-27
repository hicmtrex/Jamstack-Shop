import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import Store from './context-api';

const LOCAL_STORAGE = 'jamstack-cartItems';

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
};

const initialState = {
  cartItems:
    typeof window !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE))
        : []
      : null,
  shippingAddress: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const product = action.payload;
      const existProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existProduct) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...existProduct, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product, qty: 1 }],
        };
      }
    case ACTIONS.REMOVE_FROM_CART:
      const productItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item.id === productItem.id
      );

      if (existItem.qty === 1) {
        return {
          cartItems: state.cartItems.filter(
            (item) => item.id !== productItem.id
          ),
        };
      } else {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === productItem.id
              ? { ...existItem, qty: item.qty - 1 }
              : item
          ),
        };
      }
    case ACTIONS.DELETE_FROM_CART:
      const productDelete = action.payload;
      return {
        cartItems: state.cartItems.filter(
          (item) => item.id !== productDelete.id
        ),
      };

    case ACTIONS.CLEAR_CART:
      return { cartItems: [] };
    case ACTIONS.SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  //Cart
  const addToCart = (product, size) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        id: product.id,
        name: product.attributes?.name,
        price: product.attributes?.price,
        image: product.attributes?.image,
        qty: product.qty,
        size,
      },
    });
  };

  const removeFromCart = (product) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: product });
  };

  const deleteFromCart = (product) => {
    dispatch({ type: ACTIONS.DELETE_FROM_CART, payload: product });
  };

  const saveAddress = (address, cart) => {
    dispatch({ type: ACTIONS.SHIPPING_ADDRESS, payload: address });
  };

  //logout

  const logoutHandler = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    localStorage.removeItem(LOCAL_STORAGE);
    router.push('/api/auth/logout');
  };

  // const createOrder = async (order) => {
  //   try {
  //     const order = await axios.post('http://localhost:1337/api/orders', order);
  //   } catch (error) {}
  // };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const values = {
    addToCart,
    cartItems: state.cartItems,
    shippingAddress: state.shippingAddress,
    removeFromCart,
    deleteFromCart,
    saveAddress,
    logoutHandler,
  };
  return <Store.Provider value={values}>{children}</Store.Provider>;
};

export default ContextProvider;
