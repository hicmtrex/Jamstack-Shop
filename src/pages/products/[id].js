import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getAllProducts, getProductById } from '../../../utils/help-api';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Store from '../../store/context-api';

const ProductDetail = ({ product }) => {
  const { name, price, description } = product.attributes;
  //const category = product.attributes.category.data.attributes.name;

  const categoriesTracker = name.split('-')[1].trim();

  let category = '';

  if (categoriesTracker === 'hats') {
    category = 'hats';
  } else if (categoriesTracker === 'hoodie') {
    category = 'hoodie';
  } else {
    category = 'shirt';
  }

  const [selectImage, setSelectImage] = useState(0);
  const [size, setSize] = useState('S');

  const image = `https://strapi-testhicm.herokuapp.com${product.attributes.images.data[selectImage].attributes.url}`;
  const images = product.attributes.images.data;

  //state
  const { addToCart } = useContext(Store);

  let picker;

  if (selectImage === 1) {
    picker = '#fffcfc';
  } else if (selectImage === 2) {
    picker = 'red';
  } else if (selectImage === 3) {
    picker = '#FECEA8';
  } else if (selectImage === 4) {
    picker = '#99B898 ';
  } else {
    picker = 'black';
  }

  return (
    <>
      <Head>
        {/* <title>{product.name}</title>
        <meta name='description' content={product.fullName} /> */}
      </Head>
      <Link href={'/'}>
        <a className='btn btn-light'>
          <i className='fas fa-long-arrow-alt-left'></i> Go Back
        </a>
      </Link>

      <Row className='mt-2 mb-5'>
        <Col md={6}>
          <Image
            className='p-5'
            src={image}
            layout='responsive'
            alt={name}
            width={350}
            height={300}
            // style={{ width: '500px' }}
          />
          <ListGroup variant='flush'>
            <ListGroup.Item className='mb-2'>
              <Row>
                <Col>
                  <strong>Color</strong>
                </Col>
                {images.map((img, index) => (
                  <Col key={index}>
                    <Col
                      className='click'
                      onClick={() => setSelectImage(index)}
                    >
                      <Image
                        src={`https://strapi-testhicm.herokuapp.com${img.attributes.url}`}
                        layout='responsive'
                        height={40}
                        width={50}
                      />
                    </Col>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item as='h2'>{name}</ListGroup.Item>
            <ListGroup.Item as='h5'>
              <strong>Category : {category} </strong>
            </ListGroup.Item>
            <ListGroup.Item as='h6'>
              <strong>Price : ${price}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='mb-2'>
              <Row>
                <Col md={6}>
                  <Form.Label>
                    <strong>Size</strong>
                  </Form.Label>{' '}
                </Col>
                <Col md={6}>
                  <Form.Select
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                    className='text-center'
                  >
                    <option value='S'>S</option>
                    <option value='L'>L</option>
                    <option value='M'>M</option>
                  </Form.Select>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item className='mb-2'>
              <Row>
                <Col md={6}>
                  <strong>Colors :</strong>
                </Col>
                <Col
                  md={2}
                  style={{ backgroundColor: picker, border: '1px solid black' }}
                ></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>{description}</ListGroup.Item>

            <ListGroup.Item className='text-center'>
              <Link href='/cart' passHref>
                <Button
                  variant='danger'
                  onClick={() => addToCart(product, size)}
                  className='col-12'
                >
                  Add To Cart
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const data = await getProductById(id);

  return {
    props: {
      product: data.data,
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => {
  const products = await getAllProducts();
  const paths = products.data.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ProductDetail;
