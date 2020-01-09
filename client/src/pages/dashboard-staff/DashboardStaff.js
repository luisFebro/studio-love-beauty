import React from 'react';
import DashStaffBooking from './DashStaffBooking';
import { useStoreState } from 'easy-peasy';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
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