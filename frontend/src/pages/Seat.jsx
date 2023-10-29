import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
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

                <Row className="mb-4 d-flex align-items-center justify-content-center" >
                    <Col className="text-center">
                        <img src={userImage} alt="User Profile" className="img-fluid" />
                    </Col>
                </Row>

                <Row className="justify-content-center mb-3">
                    <Col md={4}>
                        <div className="mb-3">
                            <label htmlFor="numberOfSeats" className="form-label">No. of seats going to book</label>
                            <input type="number" className="form-control" id="numberOfSeats" placeholder="Enter number of seats" min="0"/>
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
