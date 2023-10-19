import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Seat = () => {
    const navigate = useNavigate();
    const handleCheckButtonClick = () => {
        navigate('/user');
        window.scrollTo(0, 0); 
    };

    return (
        <section>
            <Container>
        <link to='/pay'>
            <button className="btn-primary" onClick={handleCheckButtonClick}>
                Next
            </button>
        </link>
        
        </Container>
        </section>
    );
};

export default Seat;
