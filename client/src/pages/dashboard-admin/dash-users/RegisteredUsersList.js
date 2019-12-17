import React, { Fragment, useEffect, useState } from 'react';
import SearchFilter from "../../../components/search/SearchFilter";
import SearchResult from "../../../components/search/SearchResult";
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../../redux/actions/userActions';
// End Redux
import RegisteredUser from './RegisteredUser';
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

    const filteredUsers = allUsers.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const registeredUserList =
    filteredUsers.map(user => (
        <RegisteredUser
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
                placeholder="Admin, procure pelo nome do usuário"
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
                allUsersLength={allUsers.length}
                searchTerm={searchTerm}
            />
            {isLoading
            ? <LoadingThreeDots />
            : <div className="text-default">{registeredUserList}</div>}
        </Fragment>
    );
}
