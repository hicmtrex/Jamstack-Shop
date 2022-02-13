import React, { useContext } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import Store from '../../store/context-api';

const Profile = () => {
  const { userInfo } = useContext(Store);
  return (
    <Row>
      <Col md={6}>
        <h2>User Information</h2>
        <ListGroup variant='flush'>
          <ListGroup.Item>Email : {userInfo?.user.email}</ListGroup.Item>
          <ListGroup.Item>username : {userInfo?.user.username}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={6}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default Profile;
