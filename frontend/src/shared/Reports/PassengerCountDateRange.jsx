import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const PassengerCountDateRange = () => {
    const [reportData, setReportData] = useState({date1:'', date2:'', destination:''});
    
    const [passengerCount, setPassengerCount] = useState(0);
    const [showPassengerCount, setShowPassengerCount] = useState(false);

    const handleChange = e =>{
        setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }

      const handleNumber_of_passengers_for_dest_range = () => {
        const sendReportData = {
            date1: reportData.date1,
            date2: reportData.date2,
            destination: reportData.destination,
        };
        axios.post('http://127.0.0.1:5000/number_of_passengers_for_dest_range', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setPassengerCount(response.data);
                setShowPassengerCount(true);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
            }
          });
      };

    return(
        <Container style={{ backgroundColor: '#f0f0f0', borderRadius: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>  
        <form className="reservation-form">
            <h3>Number of passengers travelling to a given destination</h3>
            <div className="form-group">
                <label htmlFor="departure-date">Enter destination here:</label>
                <select id="arrival-location" name="destination" required className="form-control" onChange={handleChange}>
                <option value="" disabled selected>Select your option</option>
                    <option value="DEL">India, new Delhi</option>
                    <option value="BOM">India, Mumbai</option>
                    <option value="MAA">India, Chennai</option>
                    <option value="CGK">Indonesia, Jakarta</option>
                    <option value="DPS">Indonesia, Bali</option>
                    <option value="SIN">Singapore, Changi</option>
                    <option value="BIA">Sri Lanka, Colombo</option>
                    <option value="HRI">Sri Lanka, Hambanthota</option>
                    <option value="BKK">Thailand, Bangkok, BKK</option>
                    <option value="DMK">Thailand, Bangkok, DMK</option>
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
        </div>
        <button className="btn-primary" onClick={handleNumber_of_passengers_for_dest_range}> Get Report </button>
        <br/>
        {showPassengerCount && (
            
            <div>
            <div style={{ textAlign: 'center' }}>
          
            <h2>Number of passengers for destination {reportData.destination} between {reportData.date1} and {reportData.date2}: {passengerCount} </h2> 
            </div>
            <br/><br/><br/>
          </div>
        )}

    </Container>
    );
};

export default PassengerCountDateRange;