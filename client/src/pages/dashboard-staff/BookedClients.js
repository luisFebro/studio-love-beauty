import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../components/search/SearchFilter";
import SearchResult from "../../components/search/SearchResult";
import ButtonFab from '../../components/buttons/material-ui/ButtonFab';
import ButtonMulti from '../../components/buttons/material-ui/ButtonMulti';
import moment from 'moment';
import parse from 'html-react-parser';
import LiveClockDate from '../../components/live-clock/LiveClockDate';
import Illustration from '../../components/Illustration';
import { CLIENT_URL } from '../../config/clientUrl';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getStaffBookingList } from '../../redux/actions/staffBookingActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import ExpansiblePanel from './ExpansiblePanel';
import PanelHiddenContent from './PanelHiddenContent';
import { withRouter } from 'react-router-dom'
// End Redux
import LoadingThreeDots from '../../components/loadingIndicators/LoadingThreeDots';

moment.updateLocale('pt-br');

function BookedClients({ match, run }) {
    const [staffBookingRun, setStaffBookingRun] = useState(false);
    const [isSearching, setIsSearching] = useState(false); // n1
    const [docsLoading, setDocsLoading] = useState({
        skip: 0,
        limit: 5,
        sizeLoaded: 0,
        totalDocsSize: 0,
        loadingIndicator: "Pra já! Carregando agora..."
    })
    const {
        skip,
        limit,
        sizeLoaded,
        totalDocsSize,
        loadingIndicator
    } = docsLoading;

    const [data, setData] = useState({
        searchTerm: ""
    });
    const { searchTerm } = data;

    const { allStaffBookings, isLoading, isCustomLoading, staffName } = useStoreState(state => ({
        allStaffBookings: state.staffBookingReducer.cases.allStaffBookings,
        isLoading: state.globalReducer.cases.isLinearPLoading,
        isCustomLoading: state.globalReducer.cases.isCustomLoading,
        staffName: state.userReducer.cases.currentUser.name
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        const initialSkip = 0;
        getStaffBookingList(dispatch, match.params.staffId, initialSkip)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setDocsLoading({
                ...docsLoading,
                skip: 0,
                sizeLoaded: res.data.size,
                totalDocsSize: res.data.totalSize,
            })
        })
    }, [run, staffBookingRun])

    const onSearchChange = e => {
        const querySearched = e.target.value;
        const initialSkip = 0;
        setData({ searchTerm: querySearched })
        getStaffBookingList(dispatch, match.params.staffId, initialSkip, false, querySearched)
        setIsSearching(true);
    }

    const showSearchBar = () => (
        <div className="container-center my-4">
            <SearchFilter
                placeholder="Procure seu cliente"
                searchChange={onSearchChange}
            />
        </div>
    );

    // ExpansionPanel Content
    const actions = allStaffBookings.map(booking => {
        return({
           _id: booking._id,
           mainHeading: booking.clientName.cap(),
           secondaryHeading: parse(`
                > Data e Horário Agendamento:
                <br />
                ${typeof booking.bookingDate === "undefined" ? "Sem Agendamento" : moment(booking.bookingDate).calendar(null, { sameElse: 'LLL'})}
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
            setStaffBookingRun={setStaffBookingRun}
            staffBookingRun={staffBookingRun}
        />
    );
    //End ExpansionPanel Content

    const loadMoreDocs = () => {
        const moreDocsToSkip = skip + limit;
        getStaffBookingList(dispatch, match.params.staffId, moreDocsToSkip, true)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setDocsLoading({
                ...docsLoading,
                sizeLoaded: sizeLoaded + res.data.size,
                skip: moreDocsToSkip,
                totalDocsSize: res.data.totalSize,
            })
        })
    };

    const showMoreButton = () => {
        return(
            sizeLoaded === totalDocsSize && sizeLoaded >= limit
            ? <p className="text-main-container text-center my-3">
                {`${staffName.cap()}, isso é tudo. Não há mais clientes para mostrar.`}
              </p>
            : searchTerm.length === 0 && sizeLoaded >= limit && (
                <div className="container-center my-3">
                    <ButtonMulti
                        title={isCustomLoading ? loadingIndicator : "Carregar Mais Clientes"}
                        onClick={loadMoreDocs}
                        backgroundColor="var(--mainPink)"
                        backColorOnHover="var(--mainPink)"
                        iconFontAwesome={isCustomLoading ? "" : "fas fa-chevron-circle-down"}
                    />
                </div>
            )
        );
    };

    return (
        <Fragment>
            {sizeLoaded === 0 && isSearching !== true
            ? (
                <Fragment>
                    {isLoading
                    ? <LoadingThreeDots />
                    : (
                        <div className="py-5">
                            <Illustration
                                img={`${CLIENT_URL}/img/illustrations/empty-booking.svg`}
                                alt="Nenhum Agendamento"
                                imgStyle={{
                                    maxWidth: 400
                                }}
                                txtImgConfig = {{
                                    fontSize: '2.2rem',
                                    topPos: "100%",
                                    txt: `Você ainda não fez nenhum agendamento`,
                                    txtBorder: "border-white",
                                }}
                            />
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    <LiveClockDate />
                    {showSearchBar()}
                    <SearchResult
                        isLoading={isLoading}
                        filteredUsersLength={allStaffBookings.length}
                        allUsersLength={totalDocsSize}
                        searchTerm={searchTerm}
                        mainSubject="cliente"
                    />
                    {isLoading
                    ? <LoadingThreeDots />
                    : (
                        <div>
                            <div className="text-default">{showExpansionPanel()}</div>
                            {showMoreButton()}
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}

export default withRouter(BookedClients);

/* COMMENTS
n1: check if the searching bar has been used so that when we can get zero results it does not change to the no-scheduling illustration.
*/
