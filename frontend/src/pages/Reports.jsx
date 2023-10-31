import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

import AircraftTypeTotalRevenue from '../shared/Reports/AircraftTypeTotalRevenue';
import PassengerAbove18 from '../shared/Reports/PassengerAbove18';
import PassengerBelow18 from '../shared/Reports/PassengerBelow18';
import AllPassenger from '../shared/Reports/AllPassenger';
import PastFlight from '../shared/Reports/PastFlight';
import BookingCountDateRange from '../shared/Reports/BookingCountDateRange';
import PassengerCountDateRange from '../shared/Reports/PassengerCountDateRange';

const Reports = () => {
    

    return (
        <section>
          <br/>
          <AllPassenger/>
          <PassengerAbove18/>
          <PassengerBelow18/>
          <br />
          <br />
          <PassengerCountDateRange/>
          <br />
          <br />
          <BookingCountDateRange/>          
          <br />
          <br />
          <PastFlight/>
          <br />
          <br />
          <AircraftTypeTotalRevenue/>
          <br />
          
          
        </section>
    );
};

export default Reports;
