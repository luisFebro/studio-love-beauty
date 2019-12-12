import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import LinearProgress from '../components/loadingIndicators/LinearProgress';
// Redux
import { useStoreDispatch } from 'easy-peasy'; // useStoreState
import { readAdmin } from '../redux/actions/adminActions';
import { loadReCaptcha } from 'react-recaptcha-google';
//
import PrivateRouteAdm from '../components/auth/PrivateRouteAdm';
import { loadUser } from '../redux/actions/authActions';
import './App.css';
import '../utils/globalHelpers';
//GENERAL COMPONENTS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
//END GENERAL COMPONENTS

// PAGES
import Home from '../pages/Home';
import ChangePassword from '../pages/client/ChangePassword';
import InsertNewPassword from '../pages/client/InsertNewPassword';
import ConfirmAccount from '../pages/client/ConfirmAccount';
import Default from '../pages/Default';
import Dashboard from '../pages/dashboard-admin';
//END PAGES

//LAYOUT
// import MenuTopLogin from '../components/_layout/navbar/MenuTopLogin';
import Navbar from '../components/_layout/navbar';
import Footer from '../components/_layout/footer/Footer';
// END LAYOUT
// MODALS ANS TOASTS
import AllModals from '../components/modals';
import SnackbarMulti from '../components/Snackbar';
// END MODALS ANS TOASTS

function App() {
    const dispatch = useStoreDispatch();
    readAdmin(dispatch);

    useEffect(() => {
        loadReCaptcha();
        dispatch(loadUser(dispatch));
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ScrollToTop>
                <LinearProgress />
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/cliente/trocar-senha" exact component={ChangePassword} />
                    <Route path="/cliente/trocar-senha/:token" exact component={InsertNewPassword} />
                    <Route path="/cliente/confirmacao-conta/:authUserId" exact component={ConfirmAccount} />
                    <PrivateRouteAdm path="/painel-controle-admin" exact component={Dashboard} />
                    <Route component={Default} />
                </Switch>
                {/*Modals and Snackbars*/}
                <AllModals />
                <SnackbarMulti />
                {/*End Modals and Snackbars*/}
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;

/*
import WhatsappIcon from '../components/buttons/WhatsappIcon';
<WhatsappIcon />
 */

/* n1 Every time the user clicks on the screen,he/she is updated
// if(isUserAuthenticated) {
//     window.addEventListener('click', () => {
//         console.log("clicked");
//         readUser(dispatch)
//     });
// }
n2: this loads in the first run because it faces a fetching issue if the user loads a page other than home.
*/


/*
<CustomPreloader>
    <Preloader />
</CustomPreloader>
 */