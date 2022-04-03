import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

const Product = ({ product }) => {
  const randomNumber = Math.floor(Math.random() * 4);

  return (
    <Card className='my-3 p-3 rounded shadow'>
      <Link href={`/products/${product.id}`} passHref>
        <a style={{ backgroundColor: '#ebebeb' }}>
          <Card.Img
            variant='top'
            className='p-5'
            src={product.images[randomNumber].path}
          />

          <Card.Body>
            <Card.Title as='h4'>{product.name}</Card.Title>
            <Card.Title>${product.price}</Card.Title>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
};

export default Product;
