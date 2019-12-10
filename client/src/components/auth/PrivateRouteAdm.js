import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions';

export default function PrivateRouteAdm({ component: Component, ...rest }) {
    const { isUserAuthenticated, isAdmin } = useStoreState(state => ({
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        isAdmin: state.userReducer.cases.currentUser.isAdmin
    }))

    const dispatch = useStoreDispatch();

    const alertAndRedirect = props => {
        showSnackbar(dispatch, 'Oops! Você não tem acesso a essa sessão', 'error', 5000);
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: { from: props.location }
                }}
            />
        );
    }

    return(
        <Route
            {...rest}
            render={props =>
                isUserAuthenticated && isAdmin ? (
                    <Component {...props} />
                ) :  alertAndRedirect(props)
            }
        />
    );
}
