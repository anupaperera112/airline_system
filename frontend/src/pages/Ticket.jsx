import React, { useState } from 'react';
import '../styles/login.css';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate} from 'react-router-dom';
import registerImg from '../assets/images/plane_Register.jpg';
import { FcGoogle } from 'react-icons/fc';
import '../styles/register.css';
import axios from 'axios';

const Ticket = () => {

  const navigate = useNavigate();

  const [ticket, setTicket] = useState();





  const handleTicket = () => {

    const p_id = sessionStorage.getItem("passenger_id");

    const userData = {
      passenger_id: p_id,
      
    };

    // Send a POST request to your Flask backend
    axios.post('http://127.0.0.1:5000/viweticket', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setTicket(response.data);
      })
      .catch(error => {
        // Handle errors from the backend (e.g., display an error message)
        console.error(error);
      });
  };

  return (
    <section>
    <Container>
    <br />
    <br />
    <br />

      <button on onClick={handleTicket}>view tickets</button>
    {ticket && (
  <div>
    {ticket.map((row, index) => (
      <div key={index}>
        <p>Ticket ID: {row[0]}</p>
        <p>Flight Number: {row[1]}</p>
        <p>Departure Date: {row[2]}</p>
        <p>Seat Number: {row[3]}</p>
      </div>
    ))}
  </div>
)}
    </Container>
    </section>
  );
};

export default Ticket;

