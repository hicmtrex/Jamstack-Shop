import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import { Row, Col, ListGroup, Spinner, Image } from 'react-bootstrap';

const Profile = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  return (
    <Row>
      <Col md={6}>
        <Image
          fluid
          thumbnail
          src={user.picture}
          style={{ width: '200px' }}
          roundedCircle={true}
        />
        <h2>Information</h2>
        <ListGroup variant='flush'>
          <ListGroup.Item>Email : {user.email}</ListGroup.Item>
          <ListGroup.Item>Name : {user.name}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={6}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default Profile;
