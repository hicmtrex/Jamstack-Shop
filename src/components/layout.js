import { useRouter } from 'next/router';
import React from 'react';
import { Container, SSRProvider } from 'react-bootstrap';
import Footer from './footer';
import Header from './header';
import Slider from './slider';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <SSRProvider>
      <Header />
      {router.pathname === '/' && <Slider />}
      {/* <div className='container_app'> */}
      <Container>
        <main className='py-3'>{children}</main>
      </Container>
      {/* </div> */}
      {router.pathname === '/' && <Footer />}
      <div className='cpy_ mt-auto'>
        <p>
          © 2022 All Rights Reserved By{' '}
          <a href='https://html.design/'>Jamstack</a>
        </p>
      </div>
    </SSRProvider>
  );
};

export default Layout;
