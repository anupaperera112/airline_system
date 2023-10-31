import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
import '../styles/seat.css';
import userImage from '../assets/images/seat_map.png';
import userImage2 from '../assets/images/topic.png';
import axios from 'axios';

//should add required fields

const Seat = () => {
    const [seat, setSeat] = useState({numOfSeats: '', seatNumber: ''});
    const [airCraftModel, setAirCraftModel] = useState('');
    const handleChange = e => { setSeat(prev => ({ ...prev, [e.target.name]: e.target.value}))}

    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");
    const schedule_id = sessionStorage.getItem("flight_schedule_id");
    const navigateto = () => {
        // navigate to /home to select the flight, if already selected the flight, navigate to payment page
        if(token){
          navigate('/pay');
          window.scrollTo(0, 0);
        }else{
          navigate('/user');
          window.scrollTo(0, 0);
        }
      };

    

    const setSeatNo = () => {
        sessionStorage.setItem("seatNumber",seat.seatNumber);
    };

    const handleCheckButtonClick = () => {
        navigateto();
        setSeatNo();
        
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const Data = {
            flight_schedule_id: schedule_id,
        };

        axios.post('http://127.0.0.1:5000/getAircraft', Data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response.data);
            setAirCraftModel(response.data);
        })
        .catch(error => {
            // Handle errors from the backend (e.g., display an error message)
            console.error(error);
        });
    }, [schedule_id]);
    

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
                <Row>your plane {airCraftModel}</Row>
                <Row>
                    <table>
                        <th>
                            <tr>
                                <td className="seat">Air Craft</td>
                                <td className="seat">NO. Economy</td>
                                <td className="seat">NO. Business</td>
                                <td className="seat">NO. Platinum</td>
                            </tr>
                        </th>
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
                    </table>

                </Row>
                
                <Row className="justify-content-center mb-3">
                    <Col md={4}>
                        <div className="mb-3">
                            <label htmlFor="numberOfSeats" className="form-label">No. of seats going to book</label>
                            <input type="number" className="form-control" id="numberOfSeats" name="numOfSeats" placeholder="Enter number of seats" min="0" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="seatNumbers" className="form-label">Seat Numbers(for economy 10xx, for business 30xx, for platinum 20xx)</label>
                            <input type="text" className="form-control" id="seatNumbers" value={seat.seatNumber} required name="seatNumber" placeholder="Enter seat numbers"  onChange={handleChange}/>
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
