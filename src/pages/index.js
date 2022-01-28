import React from 'react';
import Head from 'next/head';
import { Col, Row } from 'react-bootstrap';
import { getAllProducts } from '../../utils/help-api';
import Product from '../components/product';

const HomePage = ({ products }) => {
  console.log(products);
  return (
    <>
      <Head>
        <title>Cooper Shop</title>
        <meta name='description' content='Cooper shop best gaming shop' />
      </Head>

      <Row id='products'>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await getAllProducts();
  return {
    props: {
      products: data.data,
    },
    revalidate: 600,
  };
};

export default HomePage;
