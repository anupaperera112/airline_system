import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Seat = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleCheckButtonClick = () => {
        if(token){
            navigate('/pay');
        }else{
            navigate('/user');
        }
        
        window.scrollTo(0, 0); 
    };

    return (
        <section>
            <Container>
        <button className="btn-primary" onClick={handleCheckButtonClick}>
            Next page
        </button>
        </Container>
        </section>
    );
};

export default Seat;
