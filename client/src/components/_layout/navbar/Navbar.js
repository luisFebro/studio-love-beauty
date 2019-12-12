import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import BreadCrumbs from './BreadCrumbs';
// import CategorySlider from './CategorySlider';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchCompleteWithImg from '../../SearchCompleteWithImg';
import UserDropDown from './UserDropDown';
import KeyAccessDashboard from './KeyAccessDashboard';
import MenuLogin from './menu-login';
import { storeIcon } from '../../../data/dataIcons';
import { dataWorkingHour } from '../../../utils/GetWorkingHour';

const isStoreOpen = dataWorkingHour[1];
function Navbar({ history }) {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const { isUserAuthenticated } = useStoreState(state => state.authReducer.cases);

    const addZoomout = () => {
        const icon = document.getElementById('searchIcon');
        icon.className += ' animated zoomOut slow';
        setTimeout(() => {
            setSearchOpen(true);
        }, 1000);
    };

    const closeBtn = () => {
        const icon = document.getElementById('searchIcon'),
            closeBtn = document.getElementById('closeBtn');
        // searchComplete = document.getElementById("SearchCompleteWithImg");

        closeBtn.className = 'fas fa-times-circle animated rotateOut';
        // searchComplete.className = "animated zoomOut delay-2s";
        icon.className = 'fas fa-search animated zoomIn slow';
        setTimeout(() => {
            setSearchOpen(false);
        }, 1000);
    };

    // Render
    const showLogo = () => (
        <Link to="/">
            <img
                src="img/official-logo.jpg"
                alt="Logomarca"
                width="170rem"
                height="90rem"
                className="navbar-brand animated pulse"
                style={{ animationIterationCount: '3'}}
            />
        </Link>
    );

    const showStoreBtn = () => (
        <ul className="navbar-nav align-items-center">
            <li className="nav-item">
                <Link to="/loja" className="nav-link">
                    {isStoreOpen ? (
                        <div className="store-container">
                            <img
                                width="70rem"
                                height="70rem"
                                src={storeIcon.imgSrc}
                                alt={storeIcon.altTitle}
                                title={storeIcon.altTitle}
                            />
                            <div className="store-badge badge badge-danger">Aberto</div>
                        </div>
                    ) : (
                        <span className="animated zoomIn slow">loja</span>
                    )}
                </Link>
            </li>
        </ul>
    );

    const showAccountBtn = () => (
        <Fragment>
            {isUserAuthenticated ?
                null : (
                <ul
                    className="animated zoomIn slow navbar-nav ml-3 ml-md-auto align-items-center"
                >
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <span>
                                Acessar conta
                            </span>
                        </Link>
                    </li>
                </ul>
            )}
        </Fragment>
    );

    const showBookingBtn = () => (
        <ul className="animated zoomIn slow navbar-nav ml-3 mr-3 align-items-center">
            <li className="nav-item">
                <Link to="/" className="nav-link">
                    <span>
                        Agendar
                    </span>
                </Link>
            </li>
        </ul>
    );
    // Render
    const showNav = () => (
        <NavWrapper className="navbar navbar-expand-sm navbar-dark text-nav-items">
            {showLogo()}
            {showStoreBtn()}
            {showAccountBtn()}
            {showBookingBtn()}
        </NavWrapper>
    );

    const showMenuLogin = () => (
        <DivWrapper>
            <MenuLogin />
        </DivWrapper>
    );

    // const showCategorySlider = () => (
    //     <CategorySlider />
    // );

    const showBreadCrumbs = history => (
        <BreadCrumbs history={history} />
    );

    const showKeyAccessDashboard = () => (
        <Link to="/painel-controle-admin">
            <KeyAccessDashboard />
        </Link>
    );

    return (
        <Fragment>
            {showNav()}
            {showMenuLogin()}
            {/*showCategorySlider()*/}
            {showBreadCrumbs(history)}
            {showKeyAccessDashboard()}
        </Fragment>
    );
}

export default withRouter(Navbar); // n1

/*
//SEARCH BUTTON
<div className="fixed pt-3" style={{ zIndex: 1011 }}>
    <span>
        <i id="searchIcon" className="fas fa-search" onClick={addZoomout}></i>
    </span>
</div>
{isSearchOpen ? (
    <div className="backdrop-medium">
        <SearchCompleteWithImg style={{ transition: '.5s' }} className="animated zoomIn" />
        <span>
            <i
                id="closeBtn"
                className="fas fa-times-circle animated rotateIn delay-2s"
                onClick={closeBtn}
            ></i>
        </span>
    </div>
) : null}
 */

// STYLES
const DivWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 1010;
`;
const NavWrapper = styled.nav`
    .store-container {
        position: relative;
    }

    .store-badge {
        font-size: 0.4em;
        position: absolute;
        top: 60%;
        left: 65%;
        transform: translate(-50%, -50%);
    }
    #searchIcon {
        cursor: pointer;
        z-index: 1200;
    }
    #closeBtn {
        position: fixed;
        cursor: pointer;
        font-size: 1.7em;
        top: 5rem;
        right: 5%;
        color: var(--mainWhite);
        z-index: 1500;
        filter: drop-shadow(0.001em 0.1em 0.1em var(--mainDark));
    }
    & .fixed {
        position: fixed;
        right: 1.2rem;
        top: 1.9rem;
    }
    & .navbar-nav span i,
    #searchIcon {
        font-size: 2.1rem;
        filter: drop-shadow(0.001em 0.1em 0.1em var(--mainDark));
    }
    background: var(--mainRed);
    .nav-link,
    #searchIcon {
        color: var(--mainWhite) !important;
        text-transform: capitalize;
    }

    & .nav-link:hover,
    & .navbar-nav span i:hover,
    #searchIcon:hover {
        transform: scale(1.1);
        filter: drop-shadow(0.001em 0.2em 0.1em var(--mainYellow));
    }
`;


/* COMMENTS
n1: withRouter - https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom
When you include a main page component in your app, it is often wrapped in a <Route> component like this:

<Route path="/movies" component={MoviesIndex} />
By doing this, the MoviesIndex component has access to this.props.history so it can redirect the user with this.props.history.push.

Some components (commonly a header component) appear on every page, so are not wrapped in a <Route>:

render() {
  return (<Header />);
}
This means the header cannot redirect the user.

To get around this problem, the header component can be wrapped in a withRouter function, either when it is exported:

export default withRouter(Header)
*/