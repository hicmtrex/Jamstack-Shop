import React, { useState, useContext } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Image,
  Spinner,
} from 'react-bootstrap';
import Link from 'next/link';
import CartSvg from './icons/cart-svg';
import { useUser } from '@auth0/nextjs-auth0';
import Store from '../store/context-api';

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, isLoading } = useUser();
  const { cartItems, logoutHandler } = useContext(Store);

  return (
    <header className='header_section'>
      <Navbar expand='lg' collapseOnSelect className='custom_nav-container '>
        <Container>
          <Navbar.Brand>
            <Link href={'/'} passHref>
              <a className='navbar-brand'>
                <Image width={150} src='images/Jamstack_Logo.png' alt='logo' />
              </a>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-5 '>
              <Nav.Link className='nav-item'>
                <Link href={'/'} passHref>
                  <a className='nav-link'>Home</a>
                </Link>
              </Nav.Link>
              <Nav.Link className='nav-item'>
                <Link href={'#products'} passHref>
                  <a className='nav-link'>Products</a>
                </Link>
              </Nav.Link>
            </Nav>

            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link href={'/cart'} passHref>
                  <a className='nav-link'>
                    <span className='badge'>{cartItems?.length}</span>
                    <CartSvg />
                  </a>
                </Link>
              </li>
              {!isLoading && <Spinner />}
              {user ? (
                <NavDropdown
                  title={
                    user.picture ? (
                      <Image
                        style={{ width: '35px', height: '30px' }}
                        roundedCircle={true}
                        fluid={true}
                        src={user.picture}
                        thumbnail={true}
                        alt='user picture'
                      />
                    ) : (
                      user.given_name
                    )
                  }
                  id='username'
                >
                  <Link href={'/users/profile'} passHref>
                    <NavDropdown.Item>
                      {user.given_name} Profile
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item>
                    <a onClick={logoutHandler}>Logout</a>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <li className='nav-item'>
                  <a className='nav-link ms-5' href={'/api/auth/login'}>
                    Login
                  </a>
                </li>
              )}
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
