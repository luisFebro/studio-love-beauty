import './style.css';
import React, { useState, useEffect } from 'react';
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

export default function PwaInstaller({ title, icon }) { // A2HS = App to HomeScreen
    const [bannerVisible, setBannerVisible] = useState(true);
    const dispatch = useStoreDispatch();

    const handlePwa = () => {
        let deferredPrompt = null;
        const addBtn = document.querySelector('#panelAdd');
        console.log("addBtn", addBtn);
        addBtn.style.display = 'none';


        window.addEventListener('beforeinstallprompt', (e) => {
          // Prevent Chrome 67 and earlier from automatically showing the prompt
          // e.preventDefault();
          // Stash the event so it can be triggered later.
          deferredPrompt = e;
          addBtn.style.display = 'block';

          addBtn.addEventListener('click', (e) => {
            addBtn.style.display = 'none';

            if(deferredPrompt) {
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then(function(choiceResult) {
                    if(choiceResult.outcome === 'accepted') {
                        showSnackbar(dispatch, 'Instalando App...', 'success', 6000)
                    } else {
                        showSnackbar(dispatch, 'A instalação foi cancelada.', 'warning')
                    }

                      deferredPrompt = null;

                });
            }

          })
        });

        window.addEventListener('appinstalled', (evt) => {
          showSnackbar(dispatch, 'O app foi instalado com sucesso. Acesse o app na tela inicial do seu dispositivo', 'success', 6000)
          setTimeout(() => closeWindow(), 7000)
        });
    }

    useEffect(() => {
        handlePwa();
    }, [])


    const styles = {
        icon: {
            animationDelay: '7s',
        },
        closeBtn: {
            animationDelay: '10s',
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


    const shouldRender = bannerVisible // && !isInStandaloneMode(); //&& isIos() && !isInStandaloneMode();

    return (
      <div
        id="panelAdd"
        className="add-to-home-banner"
        data-aos="fade-up"
        data-aos-duration="2000"
       >
        <div data-aos="flip-left" className="add-to-home-content">
          {icon ? <img style={styles.icon} className="add-to-home-icon animated slideInLeft" src={icon} /> : null}
          {showTitle()}
        </div>
        {showCloseBtn()}
      </div>
    );
}
