import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../../components/search/SearchFilter";
import SearchResult from "../../../components/search/SearchResult";
import ButtonFab from '../../../components/buttons/material-ui/ButtonFab';
import ButtonMulti from '../../../components/buttons/material-ui/ButtonMulti';
import moment from 'moment';
import parse from 'html-react-parser';
import Illustration from '../../../components/Illustration';
import { CLIENT_URL } from '../../../config/clientUrl';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getStaffWithBookingsList } from '../../../redux/actions/adminActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import ExpansiblePanel from './ExpansiblePanel';
import PanelHiddenContent from './PanelHiddenContent';
// End Redux
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';

moment.updateLocale('pt-br');

export default function StaffWithBookingsList() {
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

    const { staffWithBookings, isLoading, isCustomLoading, adminName } = useStoreState(state => ({
        staffWithBookings: state.adminReducer.cases.staffWithBookings,
        isLoading: state.globalReducer.cases.isLinearPLoading,
        isCustomLoading: state.globalReducer.cases.isCustomLoading,
        adminName: state.userReducer.cases.currentUser.name,
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        const initialSkip = 0;
        getStaffWithBookingsList(dispatch, initialSkip)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setDocsLoading({
                ...docsLoading,
                skip: 0,
                sizeLoaded: res.data.sizeLoaded,
                totalDocsSize: res.data.totalSize,
            })
        })
    }, [])

    const filteredUsers = staffWithBookings.filter(staff => {
        return staff.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const onSearchChange = e => {
        setData({ searchTerm: e.target.value });
    }

    const showSearchBar = () => (
        <div className="container-center my-4">
            <SearchFilter
                placeholder="Admin, procure pelo nome do colaborador"
                searchChange={onSearchChange}
            />
        </div>
    );

    // ExpansionPanel Content
    const actions = filteredUsers.map(staff => {
        return({
           _id: staff._id,
           mainHeading: staff.name.cap(),
           secondaryHeading: parse(`> Atualizado ${moment(staff.updatedAt).fromNow()}  atrás.`),
           staffBooking: staff,
           hiddenContent: <PanelHiddenContent data={staff} />
        });
    })
    // ${null} = typeof staff.staffDate === "undefined" ? "Sem Agendamento" : moment(staff.staffDate).calendar(null, { sameElse: 'LLL'}

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
            allUsers={staffWithBookings}
        />
    );
    //End ExpansionPanel Content

    const loadMoreDocs = () => {
        const moreDocsToSkip = skip + limit;
        // getStaffBookingList(dispatch, match.params.staffId, moreDocsToSkip, true)
        // .then(res => {
        //     if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
        //     setDocsLoading({
        //         ...docsLoading,
        //         sizeLoaded: sizeLoaded + res.data.size,
        //         skip: moreDocsToSkip,
        //         totalDocsSize: res.data.totalSize,
        //     })
        // })
    };

    const showMoreButton = () => {
        return(
            sizeLoaded === totalDocsSize && sizeLoaded >= limit
            ? <p className="text-main-container text-center my-3">
                {`${adminName.cap()}, isso é tudo. Não há mais colaboradores para mostrar.`}
              </p>
            : searchTerm.length === 0 && sizeLoaded >= limit && (
                <div className="container-center my-3">
                    <ButtonMulti
                        title={isCustomLoading ? loadingIndicator : "Carregar Mais Colaboradores"}
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
            {staffWithBookings.length === 0
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
                                    txt: `Não há colaboradores com agendamentos`,
                                    txtBorder: "border-white",
                                }}
                            />
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    {showSearchBar()}
                    <SearchResult
                        isLoading={isLoading}
                        filteredUsersLength={filteredUsers.length}
                        allUsersLength={totalDocsSize}
                        searchTerm={searchTerm}
                        mainSubject="colaborador"
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
