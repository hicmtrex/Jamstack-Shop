import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { baseUrl } from '../../utils/help-api';

const Product = ({ product }) => {
  const { name, price, description } = product.attributes;
  const randomNumber = Math.floor(Math.random() * 4);
  const image = product.attributes.images[randomNumber].path;

  return (
    <Card className='my-3 p-3 rounded shadow'>
      <Link href={`/products/${product.id}`} passHref>
        <a style={{ backgroundColor: '#ebebeb' }}>
          <Card.Img variant='top' className='p-5' src={image} />

          <Card.Body>
            <Card.Title as='h4'>{name}</Card.Title>
            <Card.Title>${price}</Card.Title>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
};

export default Product;
{
  /* <Card.Text>{description}</Card.Text> */
}
