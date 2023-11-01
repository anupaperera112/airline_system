import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import '../../styles/reports.css'; 


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
                showSetTotalRevenue(true)
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("found nothing");
            }
          });
      };

      return(
        <Container style={{ backgroundColor: '#f0f0f0', borderRadius: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form className="reservation-form">

            <h3>Total revenue of aircraft models</h3>
            <div className="form-group">
                <label htmlFor="departure-date">Enter aircraft model:</label>

                <select id="aircraft-model" name="Atype" required className="form-control" onChange={handleChange}>
                <option value="" disabled selected>Select your option</option>
                    <option value="Boeing 737">Boeing 737</option>
                    <option value="Boeing 757">Boeing 757</option>
                    <option value="Airbus A380">Airbus A380</option> 
                    {/* Add more options as needed */}
                </select>
            </div>
        </form>

        </div>
        <button className="btn-primary" onClick={handleTotalRevenue}> Get Report </button>
        <br/>

        

        {showTotalRevenue && (
            
          <div style={{ textAlign: 'center' }}>
            <h1>Aircraft revenue</h1>   
          {reportData.Atype} is generated total revenue of: {totalRevenue}
          <br/>
          <br/>
          <br/>
          </div>
          
        )}

    </Container>
      );
};

export default AircraftTypeTotalRevenue;