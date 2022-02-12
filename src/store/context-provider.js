import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { baseUrl } from '../../utils/help-api';
import Store from './context-api';

const LOCAL_STORAGE_CART = 'jamstack-shop-cartItems';
const LOCAL_STORAGE_USER = 'jamstack-shop-user';

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  //auth
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGIN: 'USER_LOGIN',
};

const userInfoStorage =
  typeof window !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_USER)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER))
      : null
    : null;

const cartInfoStorage =
  typeof window !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_CART)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART))
      : []
    : [];

const initialState = {
  userInfo: userInfoStorage,
  shippingAddress: null,
  cartItems: cartInfoStorage,
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
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...existProduct, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
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
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== productItem.id
          ),
        };
      } else {
        return {
          ...state,
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
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== productDelete.id
        ),
      };

    case ACTIONS.CLEAR_CART:
      return { cartItems: [] };
    case ACTIONS.SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case ACTIONS.USER_REGISTER:
      return { ...state, userInfo: action.payload };
    case ACTIONS.USER_LOGIN:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  //Cart
  const addToCart = (product, color, size) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        id: product.id,
        name: product.attributes?.name,
        price: product.attributes?.price,
        images: product.attributes?.images,
        qty: product.qty,
        color,
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

  const saveAddress = (address) => {
    dispatch({ type: ACTIONS.SHIPPING_ADDRESS, payload: address });
  };

  //user

  const userRegister = async (user) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/auth/local/register`,
        user,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      dispatch({ type: ACTIONS.USER_REGISTER, payload: data });
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const userLogin = async (user) => {
    try {
      const { data } = await axios.post(
        `https://strapi-testhicm.herokuapp.com/api/auth/local`,
        user
      );
      dispatch({ type: ACTIONS.USER_LOGIN, payload: data });
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    localStorage.removeItem(LOCAL_STORAGE_CART);
    localStorage.removeItem(LOCAL_STORAGE_USER);
    router.push('/users/login');
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const values = {
    addToCart,
    cartItems: state.cartItems,
    shippingAddress: state.shippingAddress,
    removeFromCart,
    deleteFromCart,
    saveAddress,
    //auth
    logoutHandler,
    userRegister,
    userLogin,
    userInfo: state.userInfo,
  };
  return <Store.Provider value={values}>{children}</Store.Provider>;
};

export default ContextProvider;
