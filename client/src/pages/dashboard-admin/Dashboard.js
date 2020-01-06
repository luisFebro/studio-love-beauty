import React, { Fragment } from 'react';
import Title from '../../components/Title';
import { useStoreState } from 'easy-peasy';
import GroupedDashSessions from './GroupedDashSessions';
import getDayGreetingBr from '../../utils/getDayGreetingBr';

export default function Dashboard() {
    const name = useStoreState(state => state.userReducer.cases.currentUser.name);

    return (
        <Fragment>
            <p
                style={{color: "white", margin: 0, paddingLeft: 20}}
                className="text-default"
            >
                {`${getDayGreetingBr()}${name ? `, ${name.cap()}!` : " ..."}`}
            </p>
            <br/>
            <GroupedDashSessions />
        </Fragment>
    );
}
