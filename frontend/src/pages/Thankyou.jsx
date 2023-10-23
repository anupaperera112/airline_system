import React from 'react'
import { Container,Row,Col,Button } from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/thank-you.css'



const Thankyou = () => {
    const navigate = useNavigate();
    const handleThankButtonClick = () => {
        navigate('/home');
        window.scrollTo(0, 0); 
    };
  return <section>
    <Container>
        <Row>
            <Col lg='12' className='pt-5 text-center'>
                <div className="thank__you">
                    <span>
                    <i class="ri-checkbox-circle-line"></i>
                    </span>
                    <h1 className="mb-3 fw-semibold">Thank You!</h1>          

                    <h3 className>Booking Complete! Happy Journey!</h3>
                    <h3 className>Payment is successful.</h3>


                    <Button className="btn primary__btn w-25">
                        <Link to="/home">
                            Back to Home
                        </Link>


                    <Button className="btn primary__btn w-25" onClick = {handleThankButtonClick}>
                        Back to Home
                    </Button>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Thankyou