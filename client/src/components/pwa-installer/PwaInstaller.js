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

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  // e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

function closeWindow() {
    window.close();
    return false; // preventing the browser to attempt to go to that URL (which it obviously isn't).
}

export default function PwaInstaller({ title, icon }) {
    const [bannerVisible, setBannerVisible] = useState(true);
    const dispatch = useStoreDispatch();

    window.addEventListener('appinstalled', (evt) => {
      showSnackbar(dispatch, 'O app foi instalado com sucesso. Acesse o app na tela inicial do seu dispositivo', 'success', 6000)
      setTimeout(() => closeWindow(), 7000)
    });

    async function onPwaInstallerClick() {
        const btnAdd = document.getElementById("btnAdd");
        btnAdd.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            btnAdd.style.display = 'none';
            // Show the prompt
            if(deferredPrompt) {
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
        });

    }

    // RENDER
    const showTitle = () => (
        <div
            className="add-to-home-text text-default"
            onClick={() => onPwaInstallerClick()}
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
            style={{zIndex: 2100}}
            className="add-to-home-close-btn animated rotateIn delay-4s"
            onClick={handleCloseBannerBtnClick}
        >
            <i className="fas fa-times text-white"></i>
        </div>
    );


    const shouldRender = bannerVisible && !isInStandaloneMode(); //&& isIos() && !isInStandaloneMode();

    return (
      <div>
        {shouldRender ? (
          <div id="btnAdd" className="add-to-home-banner">
            <div className="add-to-home-content">
              {icon ? <img className="add-to-home-icon animated slideInLeft delay-2s" src={icon} /> : null}
              {showTitle()}
            </div>
            {showCloseBtn()}
          </div>
        ) : null}
      </div>
    );
}
