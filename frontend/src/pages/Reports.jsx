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
          <AircraftTypeTotalRevenue/>
          <PassengerAbove18/>
          <PassengerBelow18/>
          <AllPassenger/>
          <PastFlight/>
          <BookingCountDateRange/>
          <br />
          <PassengerCountDateRange/>
        </section>
    );
};

export default Reports;
