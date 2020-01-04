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

export default function RegisteredClientsList() {
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
            name: "Fernando Teste",
            staffBooking: {
                status: {
                    name: "atrasado",
                    get color() {
                        switch(this.name) {
                            case "cancelado":
                                return "var(--mainRed)";
                            case "pendente":
                                return "var(--mainYellow)";
                            case "atrasado":
                                return "purple";
                            case "feito":
                                return "var(--mainGreen)";
                            default:
                                return "grey";
                        }
                    }
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
            _id: "fsdgfdsfdsf21323fd2",
            role: "cliente",
            name: "Roberto Teste",
            staffBooking: {
                status: {
                    name: "pendente",
                    get color() {
                        switch(this.name) {
                            case "cancelado":
                                return "var(--mainRed)";
                            case "pendente":
                                return "var(--mainYellow)";
                            case "atrasado":
                                return "purple";
                            case "feito":
                                return "var(--mainGreen)";
                            default:
                                return "grey";
                        }
                    }
                },
                notes: "",
                client: {
                    name: "Augusto Rodrigues"
                },
                date: "15° de Janeiro às 15:30"
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: "f123232dwsfdf2k13232",
            role: "cliente",
            name: "Anna Teste",
            staffBooking: {
                status: {
                    name: "cancelado",
                    get color() {
                        switch(this.name) {
                            case "cancelado":
                                return "var(--mainRed)";
                            case "pendente":
                                return "var(--mainYellow)";
                            case "atrasado":
                                return "purple";
                            case "feito":
                                return "var(--mainGreen)";
                            default:
                                return "grey";
                        }
                    }
                },
                client: {
                    name: "Patrícia Oliveira"
                },
                notes: "",
                date: "17 de Janeiro às 10:10"
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: "fsdgfdsfdsf213232",
            role: "cliente",
            name: "Angela Teste",
            staffBooking: {
                status: {
                    name: "feito",
                    get color() {
                        switch(this.name) {
                            case "cancelado":
                                return "var(--mainRed)";
                            case "pendente":
                                return "var(--mainYellow)";
                            case "atrasado":
                                return "purple";
                            case "feito":
                                return "var(--mainGreen)";
                            default:
                                return "grey";
                        }
                    }
                },
                notes: "",
                client: {
                    name: "Augusto Rodrigues"
                },
                date: "1° de Janeiro às 9:30"
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]
    // END TEMP
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
                placeholder="Procure pelo nome do seu cliente"
                searchChange={onSearchChange}
            />
        </div>
    );

    // ExpansionPanel Content
    const actions = filteredUsers.map(user => {
        return({
           _id: user._id,
           mainHeading: user.name,
           secondaryHeading: parse(`
                > Cliente Agendado: ${user.staffBooking.client.name}
                <br />
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
