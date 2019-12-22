import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../../components/search/SearchFilter";
import SearchResult from "../../../components/search/SearchResult";
import RankingPondium from './RankingPondium';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../../redux/actions/userActions';
// End Redux
import RegisteredClient from './RegisteredClient';
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';

export default function RegisteredClientsList() {
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

    const registeredUserList =
    filteredUsers.map(user => (
        <RegisteredClient
            key={user._id}
            data={user}
            allUsers={allUsers}
        />
    ));

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

    return (
        <Fragment>
            {showSearchBar()}
            <SearchResult
                isLoading={isLoading}
                filteredUsersLength={filteredUsers.length}
                allUsersLength={onlyClients.length}
                searchTerm={searchTerm}
            />
            {isLoading
            ? <LoadingThreeDots />
            : (
                <Fragment>
                    <RankingPondium />
                    <div className="text-default">{registeredUserList}</div>
                </Fragment>
            )}
        </Fragment>
    );
}
