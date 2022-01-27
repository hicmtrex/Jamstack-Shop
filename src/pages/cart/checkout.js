import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import countries from '../../../utils/countries.json';
import Store from '../../store/context-api';

const Checkout = () => {
  const router = useRouter();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.given_name);
  const [lasttName, setLastName] = useState(user?.family_name);
  const [email, setEmail] = useState(user?.email);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');

  const { cartItems, saveAddress, shippingAddress } = useContext(Store);

  const totalPrice = cartItems
    ?.reduce((acc, i) => acc + i.price * i.qty, 0)
    .toFixed(2);

  const shippingPrice = totalPrice >= 500 ? 0 : 50;
  const lastPrice = (Number(totalPrice) + Number(shippingPrice)).toFixed(2);

  const submitHandler = (e) => {
    e.preventDefault();
    saveAddress({
      user: user.nickname,
      firstName,
      email,
      country,
      address,
      postalCode,
      phone,
      state,
    });

    router.push('/cart/placeorder');
  };

  useEffect(() => {
    if (shippingAddress) return router.push('/cart/placeorder');
  }, []);

  return (
    <section className='shop checkout section'>
      <Container>
        <Row>
          <Col md={12} lg={8}>
            <div className='checkout-form'>
              <h2>Make Your Checkout Here</h2>
              <p>Please register in order to checkout more quickly</p>
              {/* Form */}
              <Form
                onSubmit={submitHandler}
                id='shipping-info'
                className='form'
              >
                <Row>
                  <Col md={6} lg={6} xs={12}>
                    <Form.Group className='form-group'>
                      <Form.Label>
                        First Name<span>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        type='text'
                        placeholder='first name'
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <Form.Group className='form-group'>
                      <Form.Label>
                        Last Name<span>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setLastName(e.target.value)}
                        value={lasttName}
                        type='text'
                        placeholder='last name'
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={6} xs={12}>
                    <Form.Group className='form-group'>
                      <Form.Label>
                        Email Address<span>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type='email'
                        placeholder='email'
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <Form.Group className='form-group'>
                      <Form.Label>
                        Phone Number<span>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        type='number'
                        placeholder='phone number'
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <Form.Group className='form-group'>
                      <Form.Label>
                        Country<span>*</span>
                      </Form.Label>
                      <Form.Select
                        name='country_name'
                        id='country'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                      >
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <Form.Group className='form-group'>
                      <Form.Label>
                        State / Divition<span>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        placeholder='state'
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <div className='form-group'>
                      <Form.Label>
                        Address Line 1<span>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        type='text'
                        name='address'
                        placeholder
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <div className='form-group'>
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control type='text' placeholder />
                    </div>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <div className='form-group'>
                      <Form.Label>
                        Postal Code<span>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                        type='text'
                        placeholder='postal code'
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6} lg={6} xs={12}>
                    <Form.Group className='form-group'>
                      <Form.Label>Company</Form.Label>
                      <Form.Control placeholder='Company' />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <div className='form-group create-account'>
                      <Form.Control id='cbox' type='checkbox' />
                      <Form.Label>Create an account?</Form.Label>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col md={12} lg={4}>
            <div className='order-details'>
              <div className='single-widget'>
                <h2>CART TOTALS</h2>
                <div className='content'>
                  <ul>
                    <li>
                      Sub Total<span>${totalPrice}</span>
                    </li>
                    <li>
                      (+) Shipping<span>${shippingPrice}</span>
                    </li>
                    <li className='last'>
                      Total<span>${lastPrice}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='single-widget'>
                <h2>Payments</h2>
                <div className='content ms-3'>
                  <Form.Check label='PayPal' className='checkbox-inline' />
                  <Form.Check
                    label='Check Payments'
                    className='checkbox-inline'
                  />
                  <Form.Check
                    label='Cash On Delivery'
                    className='checkbox-inline'
                  />
                </div>
              </div>

              <div className='single-widget payement'>
                <div className='content'>
                  <img src='/images/payment-method.png' alt='#' />
                </div>
              </div>

              <div className='single-widget get-button'>
                <div className='content'>
                  <div className='button'>
                    <Button type='submit' form='shipping-info'>
                      proceed to checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
