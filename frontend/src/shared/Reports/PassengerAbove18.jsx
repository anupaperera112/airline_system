import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const PassengerAbove18 = () => {

    const [reportData, setReportData] = useState({flight_no: ''});
    const [passengers1, setPassengers1] = useState([]);
    const [showPassengers1, setShowPassengers1] = useState(false);

    const handleChange = e =>{
        setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }

      const handlePassengers_above_18 = () => {
        const sendReportData = {
            flight_no: reportData.flight_no,
        };
        axios.post('http://127.0.0.1:5000/passengers_above_18', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
              alert("Report genarate Successfully");
              setPassengers1(response.data);
              setShowPassengers1(true);
            //   setShowPassengers2(false);
            //   setShowPassengers3(false);
              console.log(response.data);

            }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
              setShowPassengers1(false);
            }
          });
      };


      return(
        <section>
        <Container style={{ backgroundColor: '#f0f0f0' }}>
        <form className="reservation-form">
            <h3>Passenger list age above 18</h3>
            <div className="form-group">
                <label htmlFor="departure-date">Enter flight Number here:</label>
                <input type="text" id="flight-number" name="flight_no" required className="form-control" onChange={handleChange}/>                                    </div>

        </form>
        <button className="btn-primary" onClick={handlePassengers_above_18}> Get Report </button>
        {setShowPassengers1 && (
            <div>
            <h1>Passenger List</h1>   
            {passengers1.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Passenger Name</th>
                  </tr>
                </thead>
                <tbody>
                  {passengers1.map(row => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

    </Container>
    </section>
      );

};

export default PassengerAbove18;