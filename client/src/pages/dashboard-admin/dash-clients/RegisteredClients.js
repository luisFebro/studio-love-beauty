import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../../components/search/SearchFilter";
import SearchResult from "../../../components/search/SearchResult";
import ButtonFab from '../../../components/buttons/material-ui/ButtonFab';
import RankingPondium from './RankingPondium';
import moment from 'moment';
import parse from 'html-react-parser';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../../redux/actions/userActions';
import ExpansiblePanel from '../ExpansiblePanel';
import PanelHiddenContent from './PanelHiddenContent';
// End Redux
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';

moment.updateLocale('pt-br');

export default function RegisteredClientsList() {
    const [configBtns, setConfigBtns] = useState(false);
    const [data, setData] = useState({
        searchTerm: ""
    });

    const { searchTerm } = data;

    const { allUsers, isLoading } = useStoreState(state => ({
        allUsers: state.userReducer.cases.allUsers,
        isLoading: state.globalReducer.cases.isLinearPLoading,
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        readUserList(dispatch)
    }, [])

    const onlyClients = allUsers.filter(user => user.role === "cliente");

    const filteredUsers = onlyClients.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const onSearchChange = e => {
        setData({ searchTerm: e.target.value });
    }

    const showSearchBar = () => (
        <div className="container-center my-4">
            <SearchFilter
                placeholder="Admin, procure pelo nome do cliente"
                searchChange={onSearchChange}
            />
        </div>
    );

    // ExpansionPanel Content
    const actions = filteredUsers.map(user => {
        return({
           _id: user._id,
           mainHeading: user.name,
           secondaryHeading: parse(`> Pontos Acumulados: <br />${typeof user.loyaltyScores === "undefined" ? "Sem pontuação" : user.loyaltyScores.currentScore} <br />> Atualizado ${moment(user.updatedAt).fromNow()}  atrás.`),
           hiddenContent: <PanelHiddenContent data={user} />
        });
    })

    const showExpansionPanel = () => (
        <ExpansiblePanel
            actions={actions}
            backgroundColor="var(--mainDark)"
            color="var(--mainWhite)"
            statusAfterClick={configBtns}
            ToggleButton={
                <ButtonFab
                    backgroundColor="var(--mainPink)"
                    size="small"
                    iconFontAwesome="fas fa-plus"
                    iconMarginLeft="0"
                    iconAfterClick="fas fa-minus"
                    actionAfterClick={{
                        setStatus: setConfigBtns,
                        status: configBtns,
                    }}
                />
            }
            allUsers={allUsers}
        />
    );
    //End ExpansionPanel Content

    return (
        <Fragment>
            <RankingPondium />
            {isLoading
            ? <LoadingThreeDots />
            : (
                <Fragment>
                    {showSearchBar()}
                    <SearchResult
                        isLoading={isLoading}
                        filteredUsersLength={filteredUsers.length}
                        allUsersLength={onlyClients.length}
                        searchTerm={searchTerm}
                        mainSubject="cliente"
                    />
                    <div className="text-default">{showExpansionPanel()}</div>
                </Fragment>
            )}
        </Fragment>
    );
}
