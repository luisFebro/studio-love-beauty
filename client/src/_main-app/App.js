import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import { CLIENT_URL } from '../config/clientUrl';
import LinearProgress from '../components/loadingIndicators/LinearProgress';
// Redux
import { useStoreDispatch, useStoreState } from 'easy-peasy'; // useStoreState
import { readAdmin } from '../redux/actions/adminActions';
import isThisApp from '../utils/window/isThisApp';
// import { loadReCaptcha } from 'react-recaptcha-google';
//
import PrivateRouteAdm from '../components/auth/PrivateRouteAdm';
import PrivateRouteStaff from '../components/auth/PrivateRouteStaff';
import { loadUser } from '../redux/actions/authActions';
import './App.css';
import '../utils/globalHelpers';
//STYLING AND ANIMATION COMPONENTS
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
//END STYLING AND ANIMATION COMPONENTS

// PAGES
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import LoyaltyScoreHandler from '../pages/loyalty-client-scores';
import ChangePassword from '../pages/client/ChangePassword';
import InsertNewPassword from '../pages/client/InsertNewPassword';
import ConfirmAccount from '../pages/client/ConfirmAccount';
import Default from '../pages/Default';
import Dashboard from '../pages/dashboard-admin';
import DashboardStaff from '../pages/dashboard-staff';
import RegulationPage from '../pages/RegulationPage';
import DownloadApp from '../pages/DownloadApp';
import ClientMobileApp from '../pages/mobile-app/ClientMobileApp';
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

    useEffect(() => {
        readAdmin(dispatch)
        .then(res => {
            document.body.style.setProperty('background', res.data.siteBackgroundColor, 'important')
        })
        // loadReCaptcha();
        dispatch(loadUser(dispatch));
    }, [dispatch]);

    const showApp = () => (
        <Fragment>
            <LinearProgress />
            <Route path="/mobile-app" exact component={ClientMobileApp} />
            <PrivateRouteStaff path="/colaborador/quadro-administrativo/:staffId" exact component={DashboardStaff} />
            <PrivateRouteAdm path="/admin/painel-de-controle" exact component={Dashboard} />
            <Route path="/regulamento/" exact component={RegulationPage} />
        </Fragment>
    );

    const showWebsite = () => (
        <Fragment>
            <LinearProgress />
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/acesso/verificacao" exact component={LoginPage} />
                <Route path="/cliente/pontos-fidelidade" exact component={LoyaltyScoreHandler} />
                <Route path="/cliente/trocar-senha" exact component={ChangePassword} />
                <Route path="/cliente/confirmacao-conta/:authUserId" exact component={ConfirmAccount} />
                <Route path="/regulamento/" exact component={RegulationPage} />
                <Route path="/baixe-app/:userName" exact component={DownloadApp} />
                <PrivateRouteStaff path="/colaborador/quadro-administrativo/:staffId" exact component={DashboardStaff} />
                <PrivateRouteAdm path="/admin/painel-de-controle" exact component={Dashboard} />
                <Route component={Default} />
            </Switch>
            {/*Modals and Snackbars*/}
            <AllModals />
            <SnackbarMulti />
            {/*End Modals and Snackbars*/}
            <Footer />
        </Fragment>
    );

    return (
        <BrowserRouter>
            <ScrollToTop>
                {true ? showApp() : showWebsite()}
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