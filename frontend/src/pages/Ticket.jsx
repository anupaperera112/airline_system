import React, { useState } from 'react';
import '../styles/login.css';
import { Container} from 'reactstrap';
import '../styles/register.css';
import axios from 'axios';

const Ticket = () => {


  const colors = ['lightblue', 'lightyellow',  'lightgray'];
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
  <div >
    {ticket.map((row, index) => (
      <div key={index} style={{ backgroundColor: colors[index % colors.length] }}>
        <p>Ticket ID: {row[4]}</p>
        <p>Flight Number: {row[3]}</p>
        <p>Booking ID: {row[5]}</p>
        <p>Ticket Price: {row[7]}</p>
        <p>Departure Time: {row[0] + " " + row[1]}</p>
        <p>Arrival Time: {row[2]}</p>
        <p>Seat Number: {row[8]}</p>
      </div>
    ))}
  </div>
)}
    </Container>
    </section>
  );
};

export default Ticket;

