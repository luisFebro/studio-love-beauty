export const isThisApp = () => {
    const isInWebAppiOS = window.navigator.userAgent.toLowerCase();
    const resIos = /iphone|ipad|ipod/.test(isInWebAppiOS);

    const isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

    return resIos || isInWebAppChrome;
}

