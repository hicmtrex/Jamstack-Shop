import React, { useContext, useState } from 'react';
import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap';
import Store from '../../store/context-api';

const Profile = () => {
  const { userInfo } = useContext(Store);
  const [show, setShow] = useState(false);
  return (
    <div className='main-body'>
      <Row className='gutters-sm'>
        <Col md={4} className=' mb-3'>
          <Card>
            <Card.Body>
              <div className='d-flex flex-column align-items-center text-center'>
                <img
                  src='https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
                  alt='Admin'
                  className='rounded-circle'
                  width={150}
                />
                <div className='mt-3'>
                  <h4>John Doe</h4>
                  <p className='text-secondary mb-1'>Full Stack Developer</p>
                  <p className='text-muted font-size-sm'>
                    Bay Area, San Francisco, CA
                  </p>
                  <Button variant='info' className='btn-sm w-full'>
                    Edit
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className=' mb-3'>
            <Card.Body>
              <Row className='row'>
                <Col sm={3} className='col-sm-3'>
                  <h6 className='mb-0'>Full Name</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  Kenneth Valdez
                </Col>
              </Row>
              <hr />
              <Row>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Email</h6>
                </div>
                <div className='col-sm-9 text-secondary'>fip@jukmuh.al</div>
              </Row>
              <hr />
              <div className='row'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Phone</h6>
                </div>
                <div className='col-sm-9 text-secondary'>(239) 816-9029</div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Mobile</h6>
                </div>
                <div className='col-sm-9 text-secondary'>(320) 380-4539</div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Address</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  Bay Area, San Francisco, CA
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* orders */}
        <Row>
          <div className='d-flex align-items-center justify-content-between shadow mb-5 bg-white rounded py-3'>
            <h4 class='my-2 '>My Orders History</h4>
            {!show && (
              <i
                className='fa fa-fw fa-chevron-circle-down mt-1'
                onClick={() => setShow(true)}
              ></i>
            )}
            {show && (
              <i
                className='fa fa-fw fa-chevron-circle-up mt-1'
                onClick={() => setShow(false)}
              ></i>
            )}
          </div>
          {show && (
            <Row>
              <Col md={4} className='mb-3'>
                <Card className='shadow'>
                  <span className='remove__item '>
                    <i className='fa fa-times'></i>
                  </span>
                  <Card.Body>
                    <h6 className='d-flex align-items-center mb-3 justify-content-between'>
                      <span> # Order 1</span>
                      <span> Price $255</span>
                    </h6>
                    <ListGroup variant='flush'>
                      <ListGroup.Item className='px-0 d-flex align-items-center'>
                        <Row>
                          <Col md={3} sm={4} xs={4}>
                            <Image
                              roundedCircle
                              src='/images/products/codeblock/hat-black-fs8.png'
                            />
                          </Col>
                          <Col md={3} sm={4} xs={4}>
                            <p className='cardfont'>noob</p>
                          </Col>
                          <Col md={2} xs={2}>
                            5
                          </Col>
                          <Col md={3} xs={2}>
                            $500
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Row>
      </Row>
    </div>
  );
};

export default Profile;
