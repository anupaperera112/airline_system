import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

const Pay = () => {
  const navigate = useNavigate();
  const handlePayButtonClick = () => {
    // confirm the booking
    navigate('/thank-you');
    window.scroll(0,0);
  };

  const handlePay = () => {

    const schedule_id = sessionStorage.getItem("flight_schedule_id");
    const p_id = sessionStorage.getItem("passenger_id");
    const s_no = sessionStorage.getItem("seatNumber");

    const bookingdata = {
      flight_schedule_id: schedule_id,
      passenger_id: p_id,
      seat_no: s_no,
    };

    axios.post('http://127.0.0.1:5000/booking', bookingdata,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response.data);
      if(response.data && response.status===201){
        // sessionStorage.setItem("booking_id",JSON.stringify(response.data.booking_id));
        handlePayButtonClick();
        window.scrollTo(0, 0);
      }
      
    })
    .catch(error => {
      // Handle errors from the backend (e.g., display an error message)
      console.error(error);
      if(error.response.status===401){
        alert("This seat is already booked");
      }
    });
  };
  return (
    <section>
      <br />
      <br />
      <br />
            <Container>
                <button className="btn-primary" onClick={handlePay}>
                    Pay
                </button>
          </Container>
    </section>

    
  );
};

export default Pay;