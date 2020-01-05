import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../components/search/SearchFilter";
import SearchResult from "../../components/search/SearchResult";
import ButtonFab from '../../components/buttons/material-ui/ButtonFab';
import moment from 'moment';
import parse from 'html-react-parser';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../redux/actions/userActions';
import ExpansiblePanel from './ExpansiblePanel';
import PanelHiddenContent from './PanelHiddenContent';
// End Redux
import LoadingThreeDots from '../../components/loadingIndicators/LoadingThreeDots';

moment.updateLocale('pt-br');

export default function BookedClients() {
    const [data, setData] = useState({
        searchTerm: ""
    });

    const { searchTerm } = data;

    const { isLoading } = useStoreState(state => ({
        // allUsers: state.userReducer.cases.allUsers,
        isLoading: state.globalReducer.cases.isLinearPLoading,
    }));

    // TEMP
    const allUsers = [
        {
            _id: "fsdfdsfdsf21klk3232j",
            role: "cliente",
            staffBooking: {
                status: {
                    name: "atrasado",
                },
                client: {
                    name: "Letícia Lins"
                },
                notes: "O cliente pode chegar 20 minutos atrasado",
                date: "10 de Janeiro às 16:30"
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: "fsdfdsfdsf21klk32s32j",
            role: "cliente",
            staffBooking: {
                status: {
                    name: "pendente",
                },
                client: {
                    name: "Roberto Lins"
                },
                notes: "O cliente pode chegar 20 minutos atrasado",
                date: "10 de Janeiro às 16:30"
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]
    // END TEMP
    const dispatch = useStoreDispatch();

    useEffect(() => {
        readUserList(dispatch)
    }, [])

    const onlyClients = allUsers.filter(user => user.role === "cliente");

    const filteredUsers = onlyClients.filter(user => {
        return user.staffBooking.status.name.toLowerCase().includes(searchTerm.toLowerCase());
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
    const actions = filteredUsers.map(user => {
        return({
           _id: user._id,
           mainHeading: user.staffBooking.client.name,
           secondaryHeading: parse(`
                > Data e Horário:
                <br />
                ${typeof user.staffBooking === "undefined" ? "Sem Agendamento" : user.staffBooking.date}
                <br />
                > Atualizado ${moment(user.updatedAt).fromNow()}  atrás.`),
           staffBooking: user.staffBooking,
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
