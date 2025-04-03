import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './AllDoctors.css';
import '../Home/TopDoctors.css';

function AllDoctors() {
    const { speciality } = useParams(); // Accessing parameter
    const navigate = useNavigate();
    const [filterDoc, setFilterDoc] = useState([]);
    const { doctors } = useContext(AppContext);

    useEffect(() => {
        const applyFilter = () => {
            if (speciality) {
                setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
            } else {
                setFilterDoc(doctors);
            }
        };

        applyFilter();
    }, [doctors, speciality]);

    return (
        <section id="alldoctor-section" className="py-5">
            <Container>
                <p className="text-center mb-4">Browse through our trusted doctors' specialities.</p>
                <Row>
                    {/* Specialities List */}
                    <Col md={3} lg={2} className="mb-4">
                        <h5 className="fw-bold mb-3">Specialities</h5>
                        <ul className="list-unstyled">
                            {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((specialityItem) => (
                                <li key={specialityItem}>
                                    <Button
                                        variant="link"
                                        className={speciality === specialityItem ? 'text-primary' : 'text-dark'}
                                        onClick={() => speciality === specialityItem ? navigate('/doctors') : navigate(`/doctors/${specialityItem}`)}
                                    >
                                        {specialityItem}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Doctors List */}
                    <Col md={9} lg={10}>
                        <Row>
                            {filterDoc.map((item, index) => (
                                <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                                    <Card className="doctor-card">
                                        <Card.Img variant="top" src={item.image} alt="Doctor" className="img-fluid" />
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="badge bg-success text-white">Available</span>
                                            </div>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text className="text-muted">{item.speciality}</Card.Text>
                                            <Button variant="outline-primary" className="w-100">
                                                Book Appointment
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default AllDoctors;
