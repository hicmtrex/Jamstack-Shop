import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Store from '../../store/context-api';

const Login = () => {
  const { userLogin, userInfo } = useContext(Store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handlerLogin = (e) => {
    e.preventDefault();
    userLogin({ identifier: email, password });
    router.push('/');
  };

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col lg={12} xl={11}>
          <Card className='text-black' style={{ borderRadius: '25px' }}>
            <Card.Body className='p-md-5'>
              <Row className='justify-content-center'>
                <Col md={10} lg={6} xl={5} className='order-2 order-lg-1'>
                  <h1 className='text-center fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                    Sign in
                  </h1>

                  <Form onSubmit={handlerLogin} className='mx-1 mx-md-4'>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <i className='fas fa-envelope fa-lg me-3 fa-fw' />
                      <Form.Group
                        controlId='email'
                        className='form-outline flex-fill mb-0'
                      >
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='example@me.com'
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                        <Form.Text className='text-danger'></Form.Text>
                      </Form.Group>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-2'>
                      <i className='fas fa-lock fa-lg me-3 fa-fw' />
                      <Form.Group
                        controlId='password'
                        className='form-outline flex-fill mb-0'
                      >
                        <Form.Label>Your Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='*********'
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        <Form.Text className='text-danger'></Form.Text>
                      </Form.Group>
                    </div>
                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <Button type='submit' className='btn-lg'>
                        Login
                      </Button>
                    </div>
                  </Form>
                </Col>
                <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                    className='img-fluid'
                    alt='Sample image'
                  />
                </div>
              </Row>
              <Row>
                <Col>
                  New Customer?{' '}
                  <Link href='/users/register' passHref>
                    <a className='text-primary'>Register</a>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
