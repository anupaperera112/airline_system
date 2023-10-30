import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap'; // Import Table component from reactstrap
import '../styles/seat.css';
import userImage from '../assets/images/seat_map.png';
import userImage2 from '../assets/images/topic.png';

const Seat = () => {
    const [seatNumber, setSeatNumber] = useState('');
    const navigate = useNavigate();

    const handleCheckButtonClick = () => {
        navigate('/user');
        window.scrollTo(0, 0);
    };
    

    
    return (
        <Container>
            <div className="seat-box">
                <Row>
                    <img src={userImage2} alt="User Profile" className="img-fluid" style={{ maxWidth: '50vw', marginLeft: '17vw' }} />
                </Row>
                <Row>
                    <p></p>
                    <p></p>
                </Row>

                <Row className="mb-4 d-flex align-items-center justify-content-center">
                    <Col className="text-center">
                        <img src={userImage} alt="User Profile" className="img-fluid" />
                    </Col>
                </Row>

                {/* plane type */}
                <Row className="justify-content-center mb-3">
                    <Col md={6}>
                        <p className="plane-message">✈️  Your plane is "Boeing 737"</p>
                    </Col>
                </Row>

                {/* Table */}
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Table striped bordered responsive>
                            <thead>
                                <tr>
                                    <th>Aircraft</th>
                                    <th>Economy NO.</th>
                                    <th>Business NO.</th>
                                    <th>Pltinum NO.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Airbus A380</td>
                                    <td>427</td>
                                    <td>76</td>
                                    <td>14</td>
                                </tr>
                                <tr>
                                    <td>Boeing 737</td>
                                    <td>102</td>
                                    <td>48</td>
                                    <td>16</td>
                                </tr>
                                <tr>
                                    <td>Boeing 757</td>
                                    <td>108</td>
                                    <td>45</td>
                                    <td>16</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col md={4}>
                    <div className="mb-4 row align-items-center">
                        <div className="col-md-5">
                        <label htmlFor="numberOfSeats" className="form-label">No. of seats : </label>
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" id="numberOfSeats" placeholder="Enter number of seats" min="0" />
                        </div>
                    </div>

                        <div className="mb-3">
                            <label htmlFor="seatNumbers" className="form-label">Seat Numbers(Ex: A01 A02 ..)</label>
                            <input type="text" className="form-control" id="seatNumbers" placeholder="Enter seat numbers" />
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="text-center">
                        <button className="btn btn-success" onClick={handleCheckButtonClick}>
                            Check
                        </button>
                    </Col>
                </Row>
                <Row>
                    <p></p>
                    <p></p>
                </Row>

                
            </div>
        </Container>
    );
};

export default Seat;
