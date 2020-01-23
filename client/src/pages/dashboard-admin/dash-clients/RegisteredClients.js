import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../../components/search/SearchFilter";
import SearchResult from "../../../components/search/SearchResult";
import ButtonFab from '../../../components/buttons/material-ui/ButtonFab';
import RankingPondium from './RankingPondium';
import moment from 'moment';
import parse from 'html-react-parser';
import { convertDotToComma } from '../../../utils/numbers/convertDotComma';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../../redux/actions/userActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import ExpansiblePanel from '../ExpansiblePanel';
import PanelHiddenContent from './PanelHiddenContent';
// End Redux
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';
import LoadMoreItemsButton from '../../../components/buttons/LoadMoreItemsButton';

moment.updateLocale('pt-br');

const initialSkip = 0;
export default function RegisteredClientsList() {
    const [configBtns, setConfigBtns] = useState(false);
    const [run, setRun] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [clientsData, setClientsData] = useState({
        list: [],
        chunkSize: 0,
        totalSize: 0,
    });
    const { list, chunkSize, totalSize } = clientsData;

    const { isLoading, adminName } = useStoreState(state => ({
        isLoading: state.globalReducer.cases.isLinearPLoading,
        adminName: state.userReducer.cases.currentUser.name,
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        readUserList(dispatch, initialSkip, "cliente")
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

    const filteredUsers = list.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // search
    const onSearchChange = e => {
        const querySearched = e.target.value;
        setSearchTerm(querySearched);

        readUserList(dispatch, initialSkip, "cliente", querySearched)
        .then(res => {

            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setClientsData({
                ...clientsData,
                list: res.data.list,
                chunkSize: res.data.chunkSize,
                totalSize: res.data.totalSize
            })
        })
    }

    const showSearchBar = () => (
        <div className="container-center my-4">
            <SearchFilter
                placeholder="Admin, procure cliente"
                searchChange={onSearchChange}
            />
        </div>
    );
    // end search

    // ExpansionPanel Content
    const actions = filteredUsers.map(user => {
        return({
           _id: user._id,
           mainHeading: user.name.cap(),
           secondaryHeading: parse(`> Pontos Acumulados: <br />${typeof user.loyaltyScores === "undefined" ? "Sem pontuação" : convertDotToComma(user.loyaltyScores.currentScore)} <br />> Atualizado ${moment(user.updatedAt).fromNow()}  atrás.`),
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


    const showMoreItemsBtn = () => (
        <LoadMoreItemsButton
            url={`/api/user/list/all?skip=${"SKIP"}&role=cliente`}
            objPathes={{
                strList: "data.list",
                strChunkSize: "data.chunkSize",
                strTotalSize: "data.totalSize",
            }}
            setData={setClientsData}
            data={clientsData}
            remainingText="Clientes Restantes:"
            msgAfterDone={`${adminName}, Isso é tudo! Não há mais Clientes`}
            button={{
                title: "Carregar mais Usuários",
                loadingIndicator: "Carregando mais agora...",
                backgroundColor: 'var(--mainPink)',
            }}
        />
    );

    return (
        <Fragment>
            <RankingPondium />
            {showSearchBar()}
            <SearchResult
                isLoading={isLoading}
                filteredUsersLength={totalSize}
                allUsersLength={totalSize}
                searchTerm={searchTerm}
                mainSubject="cliente"
            />
            {isLoading
            ? <LoadingThreeDots />
            : (
                <Fragment>
                    <div className="text-default">{showExpansionPanel()}</div>
                    {showMoreItemsBtn()}
                </Fragment>
            )}
        </Fragment>
    );
}
