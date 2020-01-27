export const isInStandaloneMode = () => {
    const isInWebAppiOS = window.navigator.userAgent.toLowerCase();
    const resIos = /iphone|ipad|ipod/.test(userAgent);

    const isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

    return resIos || isInWebAppChrome;
}

