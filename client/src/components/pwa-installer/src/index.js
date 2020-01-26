import './style.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isIos, isInStandaloneMode } from './utils';
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import parse from 'html-react-parser';

PwaInstaller.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

export default function PwaInstaller({ title, icon }) {
    const [bannerVisible, setBannerVisible] = useState(true);
    const dispatch = useStoreDispatch();

    async function onPwaInstallerClick() {
      if(deferredPrompt) {
        deferredPrompt.prompt();
        console.log(deferredPrompt)
        deferredPrompt.userChoice.then(function(choiceResult) {
            if(choiceResult.outcome === 'accepted') {
                showSnackbar(dispatch, 'O app foi instalado', 'success')
                console.log();
            } else {
                console.log('User chose to not install your PWA');
            }

            deferredPrompt = null;

        });
      }
    }

    // RENDER
    const showTitle = () => (
        <div
            className="add-to-home-text text-default"
        >
            <a
                className="text-white"
                onClick={() => onPwaInstallerClick()}
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


    const shouldRender = bannerVisible; // bannerVisible && isIos() && !isInStandaloneMode();

    return (
      <div>
        {shouldRender ? (
          <div className="add-to-home-banner">
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
