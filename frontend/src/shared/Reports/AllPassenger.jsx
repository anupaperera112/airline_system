import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const AllPassenger = () => {
    const [reportData, setReportData] = useState({flight_no: ''});
    const [passengers3, setPassengers3] = useState([]);
    const [showPassengers3, setShowPassengers3] = useState(false);

    const handleChange = e =>{
        setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }

      const handlePassengersList = () => {
        const sendReportData = {
            flight_no: reportData.flight_no,

        };
        axios.post('http://127.0.0.1:5000/passengers_list', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setPassengers3(response.data);
                // setShowPassengers1(false);
                // setShowPassengers2(false);
                setShowPassengers3(true);
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form className="reservation-form">
            <h3>Passenger lists of flights</h3>
            <div className="form-group">
                <label htmlFor="departure-date">Enter flight schedule ID here:</label>
                <input type="text" id="flight-number" name="flight_no" required className="form-control" onChange={handleChange}/>                                    </div>

        </form>
        </div>
        <button className="btn-primary" onClick={handlePassengersList}> Get Report </button>
        <br/>
        {setShowPassengers3 && (
            
            <div>
             
            {passengers3.length > 0 && (
              <>
              <h1>Passenger List</h1>  
              <table className="table">
                <thead>
                  <tr>
                    <th>Passenger Name</th>
                  </tr>
                </thead>
                <tbody>
                  {passengers3.map(row => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </>
            )}
          </div>
        )}

    </Container>
    );
};

export default AllPassenger;