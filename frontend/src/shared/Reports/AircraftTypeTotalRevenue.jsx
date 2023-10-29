import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const AircraftTypeTotalRevenue = () => {
    const [reportData, setReportData] = useState({Atype:''});

    const [totalRevenue, setTotalRevenue] = useState(0);
    const [showTotalRevenue, showSetTotalRevenue] = useState(false);

    const handleChange = e =>{
      setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }

      const handleTotalRevenue = () => {
        const sendReportData = {
            Atype: reportData.Atype,
        };
        axios.post('http://127.0.0.1:5000/handleTotalRevenue', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setTotalRevenue(response.data);
                showSetTotalRevenue(true);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("found nothing");
            }
          });
      };

      return(
        <Container style={{ backgroundColor: '#f0f0f0' }}>
        <form className="reservation-form">
            <h3>Total revenue aircraft type</h3>
            <div className="form-group">
                <label htmlFor="departure-date">Enter passenger type:</label>
                <select id="aircraft-model" name="Atype" required className="form-control" onChange={handleChange}>
                    <option value="Boeing 737">Boeing 737</option>
                    <option value="Boeing 757">Boeing 757</option>
                    <option value="Airbus A380">Airbus A380</option> 
                    {/* Add more options as needed */}
                </select>
            </div>

        </form>
        <button className="btn-primary" onClick={handleTotalRevenue}> Get Report </button>
        {showSetTotalRevenue && (
            
            <div>
            <h1>Booking Count</h1>   
          {reportData.Atype} is generated total revenue of: {totalRevenue}
          </div>
        )}

    </Container>
      );
};

export default AircraftTypeTotalRevenue;