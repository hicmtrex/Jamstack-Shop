import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import {
  Alert,
  Button,
  Image,
  Row,
  Table,
  Col,
  Container,
} from 'react-bootstrap';
import Store from '../../store/context-api';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, deleteFromCart } =
    useContext(Store);
  console.log(cartItems);
  const totalPrice = cartItems
    ?.reduce((acc, i) => acc + i.price * i.qty, 0)
    .toFixed(2);

  const shippingPrice = totalPrice >= 500 ? 0 : 50;
  const lastPrice = (Number(totalPrice) + Number(shippingPrice)).toFixed(2);

  const router = useRouter();

  const handlerCheckout = () => {
    router.push('/cart/checkout');
  };

  return (
    <div className='shopping-cart section'>
      <Container>
        <Row>
          <Col md={12}>
            <Table striped hover responsive className='table shopping-summery'>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>NAME</th>
                  <th className='text-center '>UNIT PRICE</th>

                  <th className='text-center'>Size</th>
                  <th className='text-center'>QUANTITY</th>
                  <th className='text-center'>TOTAL</th>
                  <th className='text-center'>
                    <i className='fas fa-trash'></i>
                  </th>
                </tr>
              </thead>

              {cartItems?.length > 0 ? (
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className='image' data-title='No'>
                        <Image src={item.images[item.color].path} alt='#' />
                      </td>
                      <td className='product-des' data-title='Description'>
                        <p className='product-name'>
                          <Link href={`/products/${item.id}`}>
                            <a>{item.name}</a>
                          </Link>
                        </p>
                      </td>
                      <td className='price' data-title='Price'>
                        <span>${item.price}</span>
                      </td>
                      <td className='price' data-title='Price'>
                        <span>{item.size}</span>
                      </td>

                      <td className='qty' data-title='Qty'>
                        <div className='input-group ms-md-5 '>
                          <div className='button minus'>
                            <Button onClick={() => removeFromCart(item)}>
                              <i className='fas fa-minus' />
                            </Button>
                          </div>
                          <div className='input-number py-2'>{item.qty}</div>

                          <div className='button plus'>
                            <Button onClick={() => addToCart(item, item.size)}>
                              <i className='fas fa-plus' />
                            </Button>
                          </div>
                        </div>
                      </td>
                      <td className='total-amount' data-title='Total'>
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                      </td>
                      <td className='action' data-title='Remove'>
                        <a onClick={() => deleteFromCart(item)}>
                          <i className='fas fa-trash click'></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <Alert className='align-self-center' variant='danger'>
                  Your Cart is empty
                </Alert>
              )}
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className='total-amount'>
              <Row>
                <Col md={5} lg={8} xs={12}>
                  <div className='left'>
                    <div className='coupon'>
                      <form target='_blank'>
                        <input name='Coupon' placeholder='Enter Your Coupon' />
                        <button className='btn'>Apply</button>
                      </form>
                    </div>
                    <div className='checkbox'>
                      <label className='checkbox-inline' htmlFor={2}>
                        <input name='news' id={2} type='checkbox' /> Shipping
                        (+10$)
                      </label>
                    </div>
                  </div>
                </Col>
                <Col md={7} lg={4} xs={12}>
                  <div className='right'>
                    <ul>
                      <li>
                        Cart Subtotal
                        <span>${totalPrice}</span>
                      </li>
                      <li>
                        Shipping<span>${shippingPrice}</span>
                      </li>
                      <li>
                        You Save<span>$20.00</span>
                      </li>
                      <li className='last'>
                        You Pay<span>${lastPrice}</span>
                      </li>
                    </ul>
                    <div className='button5'>
                      <Button onClick={handlerCheckout} variant='danger'>
                        Checkout
                      </Button>

                      <Link href='/' passHref>
                        <Button variant='dark' className='py-2'>
                          Continue shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
