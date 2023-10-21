import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button } from 'reactstrap';

const Pay = () => {
  const navigate = useNavigate();

  const handleCheckButtonClick = () => {
    navigate('/home');
    window.scrollTo(0, 0);
};


  return (
    <div>
        <p id = 'paid'></p>
        <div>
          <Button  onClick={handleCheckButtonClick}>Pay</Button>
        </div>
    </div>
    
  )
}

export default Pay;