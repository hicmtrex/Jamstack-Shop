import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { dataSlider } from '../../utils/slider-data';

const Slider = () => {
  return (
    <Carousel>
      {dataSlider.map((slid, index) => (
        <Carousel.Item key={index}>
          <img src={slid.image} alt='First slide' />
          <Carousel.Caption>
            <Container>
              <Row>
                <Col md={7} lg={6}>
                  <div class='detail-box mt-5'>
                    <h1>
                      <span>Sale 20% Off</span>
                      <br />
                      On Everything
                    </h1>
                    <p>
                      Explicabo esse amet tempora quibusdam laudantium, laborum
                      eaque magnam fugiat hic? Esse dicta aliquid error
                      repudiandae earum suscipit fugiat molestias, veniam, vel
                      architecto veritatis delectus repellat modi impedit sequi.
                    </p>
                    <div className='btn-box'>
                      <a href='#products' className='btn1'>
                        Shop Now
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
