import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const BookingCountDateRange = () => {
    const [reportData, setReportData] = useState({date1:'', date2:'', ptype:''});
    
    const [bookingCount, setBookingCount] = useState(0);
    const [showbookingCount, setShowBookingCount] = useState(false);

    const handleChange = e =>{
        setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }

      const handleNumber_of_bookings_for_dest_range = () => {
        const sendReportData = {
            date1: reportData.date1,
            date2: reportData.date2,
            ptype: reportData.ptype,
        };
        axios.post('http://127.0.0.1:5000/handleNumber_of_bookings_for_dest_range', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setBookingCount(response.data);
                setShowBookingCount(true);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
            }
          });
      };

    return(
        <Container style={{ backgroundColor: '#f0f0f0' }}>
        <form className="reservation-form">
            <h3>date range booking each customer type</h3>
            <div className="form-group">
                <label htmlFor="departure-date">Enter passenger type:</label>
                <select id="arrival-location" name="ptype" required className="form-control" onChange={handleChange}>
                    <option value="new_user">new user</option>
                    <option value="Gold">gold</option>
                    <option value="Frequent">frequent</option>
                    <option value="Unregistered">unregisterd</option>
                    
                    {/* Add more options as needed */}
                </select>
            </div>
            <div className="reservation-form">
                <label htmlFor="departure-date">From:</label>
                <input type="date" id="departure-date" name="date1" required className="form-control" onChange={handleChange}/>
            </div>
            <div className="reservation-form">
                <label htmlFor="departure-date">To:</label>
                <input type="date" id="departure-date" name="date2" required className="form-control" onChange={handleChange}/>
            </div>

        </form>
        <button className="btn-primary" onClick={handleNumber_of_bookings_for_dest_range}> Get Report </button>
        {setShowBookingCount && (
            
            <div>
            <h1>Booking Count</h1>   
            Number of Booking for {reportData.ptype} between {reportData.date1} and {reportData.date2}: {bookingCount}
          </div>
        )}

    </Container>
    );

};

export default BookingCountDateRange;