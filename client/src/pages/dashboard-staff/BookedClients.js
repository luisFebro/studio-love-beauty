import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../components/search/SearchFilter";
import SearchResult from "../../components/search/SearchResult";
import ButtonFab from '../../components/buttons/material-ui/ButtonFab';
import moment from 'moment';
import parse from 'html-react-parser';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getStaffBookingList } from '../../redux/actions/staffBookingActions';
import ExpansiblePanel from './ExpansiblePanel';
import PanelHiddenContent from './PanelHiddenContent';
import { withRouter } from 'react-router-dom'
// End Redux
import LoadingThreeDots from '../../components/loadingIndicators/LoadingThreeDots';

moment.updateLocale('pt-br');

function BookedClients({ match }) {
    const [data, setData] = useState({
        searchTerm: ""
    });

    const { searchTerm } = data;

    const { allStaffBookings, isLoading } = useStoreState(state => ({
        allStaffBookings: state.staffBookingReducer.cases.allStaffBookings,
        isLoading: state.globalReducer.cases.isLinearPLoading,
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        getStaffBookingList(dispatch, match.params.staffId);
    }, [])

    const filteredUsers = allStaffBookings.filter(booking => {
        return booking.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const onSearchChange = e => {
        setData({ searchTerm: e.target.value });
    }

    const showSearchBar = () => (
        <div className="container-center my-4">
            <SearchFilter
                placeholder="Procure pelo nome do seu cliente"
                searchChange={onSearchChange}
            />
        </div>
    );

    // ExpansionPanel Content
    const actions = filteredUsers.map(booking => {
        return({
           _id: booking._id,
           mainHeading: booking.clientName.cap(),
           secondaryHeading: parse(`
                > Data e Horário:
                <br />
                ${typeof booking.bookingDate === "undefined" ? "Sem Agendamento" : booking.bookingDate}
                <br />
                > Atualizado ${moment(booking.updatedAt).fromNow()}  atrás.`),
           staffBooking: booking,
           hiddenContent: <PanelHiddenContent data={booking} />
        });
    })

    const showExpansionPanel = () => (
        <ExpansiblePanel
            actions={actions}
            backgroundColor="var(--mainDark)"
            color="var(--mainWhite)"
            ToggleButton={
                <ButtonFab
                    backgroundColor="var(--mainPink)"
                    size="small"
                    iconFontAwesome="fas fa-plus"
                    iconMarginLeft="0"
                    iconAfterClick="fas fa-minus"
                />
            }
            allUsers={allStaffBookings}
        />
    );
    //End ExpansionPanel Content

    return (
        <Fragment>
            {isLoading
            ? <LoadingThreeDots />
            : (
                <Fragment>
                    {showSearchBar()}
                    <SearchResult
                        isLoading={isLoading}
                        filteredUsersLength={filteredUsers.length}
                        allUsersLength={allStaffBookings.length}
                        searchTerm={searchTerm}
                        mainSubject="cliente"
                    />
                    <div className="text-default">{showExpansionPanel()}</div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default withRouter(BookedClients);
