import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Bannerimg from "../assets/images/appointment_img.png";
import './Banner.css';

function Banner() {
    return (
        <Container fluid className="banner-section py-5 text-white">
            <Container>
                <Row className="align-items-center">
                    <Col md={7} className="text-center text-md-start">
                        <h2 className="banner-title">Get Medical Assistance from 100+ Trusted Doctors</h2>
                        <Button href="/Register" className="rounded-pill mt-3">
                            Create Account
                        </Button>
                    </Col>
                    <Col md={5} className="text-center">
                        <img src={Bannerimg} alt="Appointment Booking" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Banner;
