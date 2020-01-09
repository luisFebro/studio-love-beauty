import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../../components/search/SearchFilter";
import SearchResult from "../../../components/search/SearchResult";
import ExpansiblePanel from '../ExpansiblePanel';
import ButtonFab from '../../../components/buttons/material-ui/ButtonFab';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../../redux/actions/userActions';
import moment from 'moment';
import parse from 'html-react-parser';
import PanelHiddenContent from './PanelHiddenContent';
// End Redux
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';

export default function RegisteredUsersList() {
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

    const onlyManagingUsers = allUsers.filter(user => user.role !== "cliente" && user.cpf !== "023.248.892-42");

    const filteredUsers = onlyManagingUsers.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const onSearchChange = e => {
        setData({ searchTerm: e.target.value });
    }

    const showSearchBar = () => (
        <div className="container-center my-4">
            <SearchFilter
                placeholder="Admin, procure pelo nome do usuário interno"
                searchChange={onSearchChange}
            />
        </div>
    );

    const whichRole = role => {
        if(role === "admin") return "Admin";
        if(role === "colaborador") return "Colaborador";
        if(role === "cliente") return "Cliente";
    }

    // ExpansionPanel Content
    const actions = filteredUsers.map(user => {
        return({
           _id: user._id,
           mainHeading: user.name,
           secondaryHeading: parse(`> Função Gerenciamento: ${whichRole(user.role)} <br />> Atualizado ${moment(user.updatedAt).fromNow()}  atrás.`),
           hiddenContent: <PanelHiddenContent data={user} />
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
            allUsers={allUsers}
        />
    );
    //End ExpansionPanel Content

    return (
        <Fragment>
            {showSearchBar()}
            <SearchResult
                isLoading={isLoading}
                filteredUsersLength={filteredUsers.length}
                allUsersLength={onlyManagingUsers.length}
                searchTerm={searchTerm}
            />
            {isLoading
            ? <LoadingThreeDots />
            : <div className="text-default">{showExpansionPanel()}</div>}
        </Fragment>
    );
}
