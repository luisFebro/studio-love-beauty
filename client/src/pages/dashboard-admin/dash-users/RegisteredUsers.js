import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../../components/search/SearchFilter";
import SearchResult from "../../../components/search/SearchResult";
import ExpansiblePanel from '../ExpansiblePanel';
import ButtonFab from '../../../components/buttons/material-ui/ButtonFab';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../../redux/actions/userActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import moment from 'moment';
import parse from 'html-react-parser';
import PanelHiddenContent from './PanelHiddenContent';
// End Redux
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';


const initialSkip = 0;
export default function RegisteredUsersList() {
    const [configBtns, setConfigBtns] = useState(false);
    const [data, setData] = useState({
        searchTerm: ""
    });
    const { searchTerm } = data;

    const [run, setRun] = useState(false);
    const [clientsData, setClientsData] = useState({
        list: [],
        chunkSize: 0,
        totalSize: 0,
    });
    const { list, chunkSize, totalSize } = clientsData;

    const { allUsers, isLoading } = useStoreState(state => ({
        isLoading: state.globalReducer.cases.isLinearPLoading,
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        readUserList(dispatch, initialSkip, "colaborador-and-admin")
        .then(res => {

            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setClientsData({
                ...clientsData,
                list: res.data.list,
                chunkSize: res.data.chunkSize,
                totalSize: res.data.totalSize
            })
        })
    }, [run])

    const onlyManagingUsers = list.filter(user => user.role !== "cliente" && user.cpf !== "023.248.892-42");

    const filteredUsers = onlyManagingUsers.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const onSearchChange = e => {
        setData({ searchTerm: e.target.value });
    }

    const showSearchBar = () => (
        <div className="container-center my-4">
            <SearchFilter
                placeholder="Admin, procure usuário interno"
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
           mainHeading: user.name.cap(),
           secondaryHeading: parse(`> Função Gerenciamento: ${whichRole(user.role)} <br />> Atualizado ${moment(user.updatedAt).fromNow()}  atrás.`),
           userData: user,
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
            setRun={setRun}
            run={run}
        />
    );
    //End ExpansionPanel Content

    return (
        <Fragment>
            {showSearchBar()}
            <SearchResult
                isLoading={isLoading}
                filteredUsersLength={list.length - 1} // need change
                allUsersLength={list.length - 1}
                searchTerm={searchTerm}
            />
            {isLoading
            ? <LoadingThreeDots />
            : <div className="text-default">{showExpansionPanel()}</div>}
        </Fragment>
    );
}
