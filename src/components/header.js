import React, { useState, useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import CartSvg from './icons/cart-svg';
import Store from '../store/context-api';
import Image from 'next/image';

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cartItems, logoutHandler, userInfo } = useContext(Store);

  return (
    <header className='header_section'>
      <Navbar expand='lg' collapseOnSelect className='custom_nav-container '>
        <Container>
          <Navbar.Brand>
            <Link href={'/'} passHref>
              <a className='navbar-brand'>
                <Image
                  width={150}
                  height={50}
                  layout='intrinsic'
                  src='/images/Jamstack_Logo.png'
                  alt='logo'
                />
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
                <a className='nav-link'></a>
              </Nav.Link>
              <Nav.Link className='nav-item'>
                <Link href='#products' passHref>
                  <a className='nav-link'>Products</a>
                </Link>
              </Nav.Link>
              <Nav.Link className='nav-item'>
                <a className='nav-link'></a>
              </Nav.Link>
              <Nav.Link className='nav-item'>
                <Link href='#about' passHref>
                  <a className='nav-link'>About</a>
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

              {userInfo ? (
                <NavDropdown
                  className='ms-3'
                  title={userInfo?.user.username}
                  id='username'
                >
                  <Link href={'/users/profile'} passHref>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item>
                    <a onClick={logoutHandler}>Logout</a>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <li className='nav-item'>
                  <Link href={'/users/login'} passHref>
                    <a className='nav-link ms-5'>Login</a>
                  </Link>
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
