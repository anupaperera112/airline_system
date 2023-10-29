import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

const Pay = () => {
  const navigate = useNavigate();
  const handlePayButtonClick = () => {
    navigate('/thank-you');
    window.scroll(0,0);
  };
  return (
    <section>
            <Container>
                <button className="btn-primary" onClick={handlePayButtonClick}>
                    Pay
                </button>
          </Container>
    </section>

    
  );
};

export default Pay;