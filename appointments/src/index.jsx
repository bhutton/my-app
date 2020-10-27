import React from 'react';
import ReactDOM from 'react-dom';
import {AppointmentsDayView} from './Appointment.jsx';
import {sampleAppointments} from './sampleData.js';

ReactDOM.render(
    <AppointmentsDayViewents={sampleAppointments}/>,
    document.getElementById('root')
);
