import React, { useContext, useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
  Table,
} from 'react-bootstrap';
import Store from '../../store/context-api';
import Link from 'next/link';
import { PayPalButton } from 'react-paypal-button-v2';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from '../../../utils/help-api';

const PlaceOrder = () => {
  const { cartItems, shippingAddress, userInfo, clearCart } = useContext(Store);
  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress) return router.push('/cart/checkout');
    if (!userInfo) return router.push('/users/login');
  }, [shippingAddress]);

  const totalPrice = cartItems
    ?.reduce((acc, i) => acc + i.price * i.qty, 0)
    .toFixed(2);

  const shippingPrice = totalPrice >= 500 ? 0 : 50;
  const taxPrice = Number(totalPrice * 0.05).toFixed(2);
  const lastPrice = (
    Number(totalPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const paypalHandler = async () => {
    const item = {
      cartItems,
      shippingAddress,
      total: totalPrice,
      user: userInfo.user.id,
    };

    try {
      const res = await axios.post(`${baseUrl}/orders`, item, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.jwt}`,
        },
      });
      if (res.data) {
        router.push('/users/profile');
        toast.success('you order has been created 😊');
        clearCart();
      }
    } catch (error) {
      return toast.error('something went wrong!');
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h2>User Address</h2>
        <Table striped hover responsive className='table shopping-summery'>
          <thead>
            <tr>
              <th>User</th>
              <th>Address</th>
              <th>Country</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='price' data-title='Price'>
                {shippingAddress?.firstName}
              </td>
              <td className='price' data-title='Price'>
                {shippingAddress?.address} - {shippingAddress?.state}
              </td>
              <td className='price' data-title='Price'>
                {shippingAddress?.country}
              </td>

              <td className='price' data-title='Price'>
                {shippingAddress?.phone}
              </td>
            </tr>
          </tbody>
        </Table>

        <h2>Order Items</h2>
        {cartItems?.length === 0 ? (
          <Alert>Order is empty</Alert>
        ) : (
          <Table striped hover responsive className='table shopping-summery'>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>NAME</th>
                <th className='text-center '>UNIT PRICE</th>

                <th className='text-center'>Size</th>
                <th className='text-center'>QUANTITY</th>
                <th className='text-center'>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <tr key={index}>
                  <td className='image' data-title='No'>
                    <Image src={item.images[item.color].path} alt='#' />
                  </td>
                  <td className='product-des' data-title='Description'>
                    <p className='product-name'>
                      <Link href={`/products/${item.id}`}>
                        <a>{item.name}</a>
                      </Link>
                    </p>
                  </td>
                  <td className='price' data-title='Price'>
                    <span>${item.price}</span>
                  </td>
                  <td className='price' data-title='Price'>
                    <span>{item.size}</span>
                  </td>
                  <td className='price' data-title='Qty'>
                    <span>{item.qty}</span>
                  </td>
                  <td className='price' data-title='Price'>
                    <span>${item.qty * item.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Items : <strong className='float-end'>${totalPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Shipping{' '}
                  <strong className='float-end'>${shippingPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Tax <strong className='float-end'>${taxPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Total <strong className='float-end'>${lastPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <PayPalButton amount={lastPrice} onSuccess={paypalHandler} />
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrder;
