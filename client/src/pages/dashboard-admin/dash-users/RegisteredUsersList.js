import React, { Fragment, useEffect } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { readUserList } from '../../../redux/actions/userActions';
// End Redux
import RegisteredUser from './RegisteredUser';
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';

export default function RegisteredUsersList() {
    const { allUsers, isLoading } = useStoreState(state => ({
        allUsers: state.userReducer.cases.allUsers,
        isLoading: state.globalReducer.cases.isLinearPLoading,
    }));

    const dispatch = useStoreDispatch();

    useEffect(() => {
        readUserList(dispatch)
    }, [])

    const registeredUserList = allUsers.map(user => <RegisteredUser
                                                            key={user._id}
                                                            data={user}
                                                            allUsers={allUsers} />
                                            );

    return (
        <Fragment>
            <div>
                <h2 className="text-sub-title text-left pl-5">
                    Total de Usuários: <strong>{allUsers.length}</strong>
                </h2>
            </div>
            {isLoading
            ? <LoadingThreeDots />
            : <div className="text-default">{registeredUserList}</div>}
        </Fragment>
    );
}
