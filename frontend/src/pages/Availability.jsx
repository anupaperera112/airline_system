import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Availability = () => {
    const navigate = useNavigate();
    const handleCheckButtonClick = () => {
        navigate('/seat');
        window.scrollTo(0, 0); 
    };

    return (
        <section>
            <Container>
        <button className="btn-primary" onClick={handleCheckButtonClick}>
            Next
        </button>
        </Container>
        </section>
    );
};

export default Availability;
