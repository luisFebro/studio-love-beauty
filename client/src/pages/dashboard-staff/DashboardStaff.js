import React from 'react';
import DashStaffBooking from './DashStaffBooking';
import DashStaffFinance from './dash-staff-finance/DashStaffFinance';
import { useStoreState } from 'easy-peasy';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TabSessions from '../../components/TabSessions';
import getDayGreetingBr from '../../utils/getDayGreetingBr';

export default function DashboardStaff() {
    const name = useStoreState(state => state.userReducer.cases.currentUser.name);

    const data = [
        {
            tabLabel: "Agendamentos",
            tabIcon: <LibraryBooksIcon />,
            tabContentPanel: <DashStaffBooking />
        },
        {
            tabLabel: "Finanças",
            tabIcon: <MonetizationOnIcon />,
            tabContentPanel: <DashStaffFinance />
        },
    ];

    return (
        <div>
            <p
                style={{color: "white", margin: 0, paddingLeft: 20}}
                className="text-default"
            >
                {`${getDayGreetingBr()}${name ? `, ${name.cap()}!` : " ..."}`}
            </p>
            <br/>
            <TabSessions
                data={data}
                needTabFullWidth={true}
            />
        </div>
    );
}