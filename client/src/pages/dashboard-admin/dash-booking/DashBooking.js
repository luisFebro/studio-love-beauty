import React, { Fragment } from 'react';
import DashSectionTitle from '../../DashSectionTitle';
import StaffWithBookingsList from './StaffWithBookingsList';

export default function DashBooking() {
    return (
        <Fragment>
            <DashSectionTitle title="Todos Agendamentos dos Colaboradores" />
            <StaffWithBookingsList />
        </Fragment>
    );
}
