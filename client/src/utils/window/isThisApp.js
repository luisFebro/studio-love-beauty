export const isThisApp = () => {
    const isInWebAppiOS = window.navigator.userAgent.toLowerCase();
    console.log("isInWebAppiOS", isInWebAppiOS);
    const resIos = /iphone|ipad|ipod/.test(isInWebAppiOS);
    console.log("resIos", resIos);

    const isAppFromChrome = !window.screenTop && !window.screenY;
    console.log("isAppFromChrome", isAppFromChrome);
    const isAppFromFirefox = window.fullScreen;
    console.log("isAppFromFirefox", isAppFromFirefox);
    const isAppFromSafari = window.navigator.standAlone;
    console.log("isAppFromSafari", isAppFromSafari);
    const isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);
    console.log("isInWebAppChrome", isInWebAppChrome);

    return resIos || isInWebAppChrome || isAppFromChrome || isAppFromFirefox || isAppFromSafari;
}

