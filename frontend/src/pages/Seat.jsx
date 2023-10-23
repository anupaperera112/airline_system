import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Seat = () => {
    const [seatNumber, setSeatNumber] = useState('');
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleSelectButtonClick = () => {
        if(token){
            sessionStorage.setItem("seatNumber", seatNumber);
            navigate('/pay');
        }else{
            navigate('/user');
        }
        
        window.scrollTo(0, 0); 
    };

    return (
        <section>
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="seatNumber">Seat Number</Label>
                        <Input type="text" name="seatNumber" id="seatNumber" placeholder="Enter seat number" value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} required />
                    </FormGroup>
                </Form>
                <button className="btn-primary" onClick={handleSelectButtonClick}>
                    Next page
                </button>
            </Container>
        </section>
    );
};

export default Seat;
