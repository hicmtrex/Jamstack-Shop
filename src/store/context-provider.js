import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { baseUrl, setError } from '../../utils/help-api';
import Store from './context-api';
import toast from 'react-hot-toast';

const LOCAL_STORAGE_CART = 'jamstack-shop-cartItems';
const LOCAL_STORAGE_USER = 'jamstack-shop-user';
const LOCAL_STORAGE_ADDRESS = 'jamstack-shop-address';

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  //auth
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGIN: 'USER_LOGIN',
  //orders
  GET_USER_ORDERS_REQUEST: 'GET_USER_ORDERS_REQUEST',
  GET_USER_ORDERS_SUCCESS: 'GET_USER_ORDERS_SUCCESS',
  GET_USER_ORDERS_FAIL: 'GET_USER_ORDERS_FAIL',
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

const addressInfoStorage =
  typeof window !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_ADDRESS)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_ADDRESS))
      : null
    : null;

const initialState = {
  userInfo: userInfoStorage,
  shippingAddress: addressInfoStorage,
  cartItems: cartInfoStorage,
  userOrders: [],
  loading: false,
  error: null,
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
      return { ...state, cartItems: [] };

    case ACTIONS.SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case ACTIONS.USER_REGISTER:
      return { ...state, userInfo: action.payload };
    case ACTIONS.USER_LOGIN:
      return { ...state, userInfo: action.payload };
    //orders
    case ACTIONS.GET_USER_ORDERS_REQUEST:
      return { ...state, userOrders: [], loading: true };
    case ACTIONS.GET_USER_ORDERS_SUCCESS:
      return { ...state, loading: false, userOrders: action.payload };
    case ACTIONS.GET_USER_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };
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
        name: product.name,
        price: product.price,
        images: product.images,
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
    localStorage.setItem(LOCAL_STORAGE_ADDRESS, JSON.stringify(address));
  };

  //user

  const userRegister = async (user) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/local/register`, user, {
        headers: {
          Accept: 'application/json',
        },
      });
      if (res.data) {
        dispatch({ type: ACTIONS.USER_REGISTER, payload: res.data });
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(data));
        router.push('/');
      } else {
        toast.error('invalid input!');
      }
    } catch (error) {
      toast.error('invalid input!' + error.message);
    }
  };

  const userLogin = async (user) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/local`, user, {
        'Content-Type': 'application/json',
      });

      if (res.data) {
        dispatch({ type: ACTIONS.USER_LOGIN, payload: res.data });
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(res.data));

        toast(`Welcome ${res.data.user.username}`, {
          icon: '👏',
        });
        router.push('/');
      }
    } catch (error) {
      toast.error('Wrong email or password');
    }
  };

  const logoutHandler = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    localStorage.removeItem(LOCAL_STORAGE_CART);
    localStorage.removeItem(LOCAL_STORAGE_USER);
    localStorage.removeItem(LOCAL_STORAGE_ADDRESS);
    router.push('/users/login');
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  //orders

  const getUserOrders = async () => {
    try {
      dispatch({ type: ACTIONS.GET_USER_ORDERS_REQUEST });
      const res = await axios.get(`${baseUrl}/orders`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${state.userInfo.jwt}`,
        },
      });
      if (res.data) {
        dispatch({ type: ACTIONS.GET_USER_ORDERS_SUCCESS, payload: res.data });
      }
    } catch (error) {
      toast.error(setError(error));
      dispatch({
        type: ACTIONS.GET_USER_ORDERS_FAIL,
        payload: error.message,
      });
    }
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
    clearCart,
    userInfo: state.userInfo,
    //orders
    getUserOrders,
    userOrders: state.userOrders,
  };
  return <Store.Provider value={values}>{children}</Store.Provider>;
};

export default ContextProvider;
