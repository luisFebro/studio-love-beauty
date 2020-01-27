import './style.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isIos, isInStandaloneMode } from './utils';
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import parse from 'html-react-parser';

PwaInstaller.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
}

function closeWindow() {
    window.close();
    return false; // preventing the browser to attempt to go to that URL (which it obviously isn't).
}


let deferredPrompt = null;
export default function PwaInstaller({ title, icon }) { // A2HS = App to HomeScreen
    const [bannerVisible, setBannerVisible] = useState(true);
    const dispatch = useStoreDispatch();

    window.addEventListener('beforeinstallprompt', (e) => { // n1
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        // e.preventDefault();
        // Stash the event so it can be triggered later.
        console.log("running beforeinstallprompt")
        deferredPrompt = e;
        console.log("deferredPrompt", deferredPrompt);
    })

    const handlePwaInstall = () => {
        console.log("handlePwaInstall clicked")
        setBannerVisible(false);

        if(deferredPrompt) {
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then(function(choiceResult) {
                if(choiceResult.outcome === 'accepted') {
                    showSnackbar(dispatch, 'Instalando App em instantes...', 'success', 7000)
                    setTimeout(() => {
                        showSnackbar(dispatch, 'Instalado com sucesso! Você já pode acessar o app pela sua tela inicial', 'success', 6000)
                        setTimeout(() => closeWindow(), 7000)
                        // window.addEventListener('appinstalled', (evt) => {
                        // });
                    }, 13000)
                } else {
                    showSnackbar(dispatch, 'A instalação do app foi cancelada.', 'warning')
                }
                deferredPrompt = null;
            });
        }
    }


    const styles = {
        icon: {
            animationDelay: '4s',
        },
        closeBtn: {
            animationDelay: '6s',
            zIndex: 2100,
        },
    }

    // RENDER
    const showTitle = () => (
        <div
            className="add-to-home-text text-default"
        >
            <a
                className="text-white"
            >
              { parse(title) || 'Add to Home Screen'}
            </a>
        </div>
    );

    const handleCloseBannerBtnClick = () => setBannerVisible(false);

    const showCloseBtn = () => (
        <div
            style={styles.closeBtn}
            className="add-to-home-close-btn animated rotateIn"
            onClick={handleCloseBannerBtnClick}
        >
            <i className="fas fa-times text-white"></i>
        </div>
    );

    const shouldRender = bannerVisible && !isInStandaloneMode(); // { // && isIos()
    console.log("shouldRender6", shouldRender);
    console.log("isInstadalone6", !isInStandaloneMode());
    console.log("bannerVisible6", bannerVisible);
    console.log("deferredPrompt6", deferredPrompt);

    return (
        <div>
            {shouldRender
            ? (
                <div
                  className="add-to-home-banner"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                    <div
                        onClick={handlePwaInstall}
                        data-aos="flip-left"
                        className="add-to-home-content"
                    >
                        {icon ? <img style={styles.icon} className="add-to-home-icon animated slideInLeft" src={icon} /> : null}
                        {showTitle()}
                    </div>
                    {showCloseBtn()}
                </div>
            ) : null}
        </div>
    );
}


/* COMMENTS
n1: If the user selects Install, the app is installed (available as standalone desktop app), and the Install button no longer shows (the onbeforeinstallprompt event no longer fires if the app is already installed).
*/