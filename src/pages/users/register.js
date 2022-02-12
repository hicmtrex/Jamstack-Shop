import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Store from '../../store/context-api';

const Register = () => {
  const { userRegister } = useContext(Store);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  const handlerRegister = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert('password not match');
      return;
    }
    userRegister({ username, email, password });
    router.push('/');
  };
  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col lg={12} xl={11}>
          <Card className='text-black' style={{ borderRadius: '25px' }}>
            <Card.Body className='p-md-5'>
              <Row className='justify-content-center'>
                <Col md={10} lg={6} xl={5} className='order-2 order-lg-1'>
                  <h1 className='text-center fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                    Sign up
                  </h1>

                  <Form onSubmit={handlerRegister} className='mx-1 mx-md-4'>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <i className='fas fa-user fa-lg me-3 fa-fw' />
                      <Form.Group
                        controlId='username'
                        className='form-outline flex-fill mb-0'
                      >
                        <Form.Label>Your Username</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='username'
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                      </Form.Group>
                    </div>
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
                      </Form.Group>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <i className='fas fa-lock fa-lg me-3 fa-fw' />
                      <Form.Group
                        controlId='password'
                        className='form-outline flex-fill mb-0'
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='**********'
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </Form.Group>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <i className='fas fa-key fa-lg me-3 fa-fw' />
                      <Form.Group
                        controlId='repeatPassword'
                        className='form-outline flex-fill mb-0'
                      >
                        <Form.Label>Repeat your password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='**********'
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          value={repeatPassword}
                        />
                      </Form.Group>
                    </div>
                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <Button type='submit' className='btn-lg'>
                        Register
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
                  Already Have an Account?{' '}
                  <Link href='/users/login' passHref>
                    <a className='text-primary'>Login</a>
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

export default Register;
