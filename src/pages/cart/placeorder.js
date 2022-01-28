import React, { useContext, useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Alert } from 'react-bootstrap';
import Store from '../../store/context-api';
import Link from 'next/link';
import { PayPalButton } from 'react-paypal-button-v2';
import { useRouter } from 'next/router';

const PlaceOrder = () => {
  const { cartItems, shippingAddress } = useContext(Store);
  const router = useRouter();

  // useEffect(() => {
  //   if (!shippingAddress) return router.push('/cart/checkout');
  // }, [shippingAddress]);

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

  const paypalHandler = () => {
    router.push('/');
  };

  const order = {};
  return (
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>User</h2>
            <p>
              <strong>Name: </strong> {shippingAddress?.user}
            </p>
            <p>
              <strong>Email: </strong>{' '}
              <a href={`mailto:${shippingAddress?.email}`}>
                {shippingAddress?.email}
              </a>
            </p>
            {/* <p>
            <strong>Address:</strong>
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode},{" "}
            {order.shippingAddress.country}
          </p> */}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Shipping Address</h2>
            <p>
              <strong>
                Address : {shippingAddress?.address} - {shippingAddress?.state}
              </strong>
            </p>
            <p>
              <strong>Postal Code : {shippingAddress?.postalCode} </strong>
            </p>
            <p>
              <strong>Phone : {shippingAddress?.phone} </strong>
            </p>
            <p>
              <strong>Country : {shippingAddress?.country} </strong>
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {cartItems?.length === 0 ? (
              <Alert>Order is empty</Alert>
            ) : (
              <ListGroup variant='flush'>
                {cartItems?.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.images[0].path}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link href={`/product/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
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
