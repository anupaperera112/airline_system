import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Container } from 'reactstrap';

const Pay = () => {
  const navigate = useNavigate();

  const handlePayButtonClick = () => {
    navigate('/thank-you');
    window.scrollTo(0, 0);
};


  return (
    <div>
        <Container>
          <Button  onClick={handlePayButtonClick}>Pay</Button>
        </Container>        
    </div>
    
  )
}

export default Pay;