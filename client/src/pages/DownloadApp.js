import React, { useState, Fragment } from 'react';
import ScrollArray from '../keyframes/built/scroll-arrow/ScrollArray';
import "../keyframes/gradientAnimation.css";
import AOS from 'aos';
import parse from 'html-react-parser';
import PwaInstaller from '../components/pwa-installer/PwaInstaller';
import { CLIENT_URL } from '../config/clientUrl';
import { Link } from 'react-router-dom';

const isSmall = window.Helper.isSmallScreen();
const truncate = (name, leng) => window.Helper.truncate(name, leng);

const checkIfElemIsVisible = (elem, setRun, needPartially = false) => {
    window.onscroll = function() {
        const res = isElemVisible(elem) ? true : false;
        console.log(res);
        return;
    };

    function isElemVisible(elem, needPartially) {
        if(!elem) throw Error("You need to declare an element as the first parameter");

        elem = document.querySelector(elem);
        if(true) { // not displaying. true ttemp
            const rect = elem.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;

            let res;
            const isTotallyVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
            const isPartiallyVisible = elemTop < window.innerHeight && elemBottom >= 0;

            res = needPartially ? isPartiallyVisible : isTotallyVisible;

            setRun(res);
        }
    }
}

export default function DownloadApp({ match, location }) {
    const [userName, setUserName] = useState(match.params.userName);
    const [run, setRun] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const isFromRegister = location.search.includes("isFromRegister=true");

    checkIfElemIsVisible("#target", setRun, true);

    AOS.init({
        offset: 50,
        delay: 1000,
    });

    const styles = {
        icon: {
            fontSize: '3rem',
            fontWeight: 'bold',
        },
        margin: {
            marginTop: '110px',
        }
    }

    const showMainText = () => (
        <div className="container-center">
            <div className="text-center">
                <p className="pl-3 text-rem-5 text-left text-default">Oi,<br /> {truncate(userName.cap(), isSmall ? 22 : 30)}</p>
                <div className="text-rem-2-5">
                    {isFromRegister
                    ? (
                        <Fragment>
                            <p className="font-weight-bold">Você foi registrado(a) com sucesso! <i style={styles.icon}>🎉</i></p>
                            <p className="my-1 font-weight-bold" data-aos="fade-up" data-aos-delay="80">{parse(`Seja ${isSmall ? "<br />" : ""} bem-vindo(a)!`)}</p>
                            <ScrollArray />
                            <p style={styles.margin} data-aos="fade-up">Baixe agora o app do salão e<br/>faça seu login de acesso por lá.</p>
                            <ScrollArray margin={30}/>
                            <p style={styles.margin} data-aos="fade-up">É leve e baixa em segundos!</p>
                            <ScrollArray margin={30} />
                            <div id="target" style={{minHeight: '200px 0'}}>
                                <ScrollArray margin={20} />
                            </div>
                            <PwaInstaller
                                title={`<strong>${userName.cap()},<br />baixe nosso app aqui</strong><br />e tenha <strong>acesso rápido</strong><br />aos seus pontos de fidelidade.`}
                                icon={`${CLIENT_URL}/favicon/android-chrome-192x192.png`}
                                run={run}
                                setIsInstalled={setIsInstalled}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p>Para baixar o app da Love Beauty Love</p>
                            <ScrollArray margin={20}/>
                            <br/>
                            <br/>
                            <p>Primeiro faça seu cadastro <Link to="/" style={{fontWeight: 'bold'}}>AQUI.</Link></p>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div id="holder" className="text-white gradient-animation" style={{minHeight: '305vmin'}}>
            {showMainText()}
        </div>
    );
}

/*
<p>{!isInstalled ? parse("<br /><br />Foi instalado.<br/>Visite sua galeria<br />de Apps") : ""}</p>
 */