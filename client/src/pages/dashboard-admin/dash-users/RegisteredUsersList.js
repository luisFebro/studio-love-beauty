import React, { useState, useEffect, Fragment } from 'react';
// Redux
import { useStoreState } from 'easy-peasy';
// End Redux
import RegisteredUser from './RegisteredUser';
import LoadingThreeDots from '../../../components/loadingIndicators/LoadingThreeDots';

export default function RegisteredUsersList() {
    const [total, setTotal] = useState({
        allFavorites: 0,
        allItemsInCart: 0
    });

    const { allUsers, isLoading, gotError, errorMsg } = useStoreState(state => ({
        allUsers: state.userReducer.cases.allUsers,
        isLoading: state.globalReducer.cases.isLoading,
        gotError: state.globalReducer.cases.gotError,
        errorMsg: state.globalReducer.cases.errorMsg
    }));

    const getTotals = allUsers => {
        const fav = [0],
            cart = [0];
        allUsers.forEach(user => {
            fav.push(user.favoriteList.length);
            cart.push(user.inCartList.length);
        });
        const totalFav = fav.reduce((tot, cur) => tot + cur);
        const totalCart = cart.reduce((tot, cur) => tot + cur);
        setTotal({
            allFavorites: totalFav,
            allItemsInCart: totalCart
        });
    };

    useEffect(() => {
        getTotals(allUsers);
    }, [allUsers]);

    const registeredUserList = allUsers.map(user => <RegisteredUser key={user._id} data={user} />);

    return (
        <Fragment>
            <div>
                <h2 className="text-main-container text-center">Totais de Todos os Usuários:</h2>
                <div className="container-center" style={{ flexDirection: 'column' }}>
                    <h2>
                        Itens
                        <i
                            style={{
                                animationIterationCount: 10,
                                animationDelay: '2s',
                                fontSize: '2.3rem',
                                color: 'var(--mainRed)'
                            }}
                            className=" animated heartBeat fast fas fa-heart"
                        ></i>
                        : <strong>{total.allFavorites}</strong>
                    </h2>
                    <h2>
                        Itens
                        <i
                            style={{ animationDelay: '2s', fontSize: '2.3rem', color: 'var(--mainYellow)' }}
                            className="animated lightSpeedIn slow fas fa-shopping-cart"
                        ></i>
                        : <strong>{total.allItemsInCart}</strong>
                    </h2>
                </div>
                <br />
                <h2 className="text-sub-title text-left pl-5">
                    Total de Usuários: <strong>{allUsers.length}</strong>
                </h2>
            </div>
            {isLoading ? (
                <LoadingThreeDots />
            ) : (
                <div>
                    {gotError ? (
                        <p className="py-3 text-default">{errorMsg}</p>
                    ) : (
                        <div className="text-default">{registeredUserList}</div>
                    )}
                </div>
            )}
        </Fragment>
    );
}
