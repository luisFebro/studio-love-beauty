import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreState } from 'easy-peasy';
// import { showSnackbar } from '../../redux/actions/snackbarActions';

export default function PrivateRouteAdm({ component: Component, ...rest }) {
    const { isUserAuthenticated, isStaff } = useStoreState(state => ({
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        isStaff: state.userReducer.cases.currentUser.isStaff
    }))

    // const dispatch = useStoreDispatch();

    const alertAndRedirect = props => {
        //showSnackbar(dispatch, 'Oops! Você não tem acesso a essa sessão', 'error', 5000);
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
                isUserAuthenticated && isStaff ? (
                    <Component {...props} />
                ) :  alertAndRedirect(props)
            }
        />
    );
}
