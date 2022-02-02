import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import { Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import Image from 'next/image';

const Profile = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  return (
    <Row>
      <Col md={6}>
        <Image
          height={150}
          src={user.picture}
          layout='intrinsic'
          width={200}
          className='rounded'
        />
        <h2>User Information</h2>
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
