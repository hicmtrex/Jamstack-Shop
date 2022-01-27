import Link from 'next/link';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={4}>
            <div className='full'>
              <div className='logo_footer'>
                <a href='#'>
                  <img width='210' src='images/Jamstack_Logo.png' alt='#' />
                </a>
              </div>
              <div className='information_f'>
                <p>
                  <strong>ADDRESS:</strong> 28 White tower, Street Name New York
                  City, USA
                </p>
                <p>
                  <strong>TELEPHONE:</strong> +91 987 654 3210
                </p>
                <p>
                  <strong>EMAIL:</strong> yourmain@gmail.com
                </p>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Row>
              <Col md={7}>
                <Row>
                  <Col md={6}>
                    <div className='widget_menu'>
                      <h3>Menu</h3>
                      <ul>
                        <li>
                          <a href='#'>Home</a>
                        </li>
                        <li>
                          <a href='#'>About</a>
                        </li>
                        <li>
                          <a href='#'>Services</a>
                        </li>
                        <li>
                          <a href='#'>Testimonial</a>
                        </li>
                        <li>
                          <a href='#'>Blog</a>
                        </li>
                        <li>
                          <a href='#'>Contact</a>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className='widget_menu'>
                      <h3>Account</h3>
                      <ul>
                        <li>
                          <a href='#'>Account</a>
                        </li>
                        <li>
                          <a href='#'>Checkout</a>
                        </li>
                        <li>
                          <Link href='/api/auth/login' passHref>
                            <a>Login</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/api/auth/login' passHref>
                            <a>Register</a>
                          </Link>
                        </li>
                        <li>
                          <a href='#'>Shopping</a>
                        </li>
                        <li>
                          <a href='#'>Widget</a>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <div className='widget_menu'>
                  <h3>Newsletter</h3>
                  <div className='information_f'>
                    <p>Subscribe by our newsletter and get update protidin.</p>
                  </div>
                  <div className='form_sub'>
                    <form>
                      <fieldset>
                        <div className='field'>
                          <input
                            type='email'
                            placeholder='Enter Your Mail'
                            name='email'
                          />
                          <input type='submit' value='Subscribe' />
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
