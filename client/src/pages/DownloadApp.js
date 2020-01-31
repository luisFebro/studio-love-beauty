import React, { useState } from 'react';
import ScrollArray from '../keyframes/built/scroll-arrow/ScrollArray';
import "../keyframes/gradientAnimation.css";
import AOS from 'aos';
import parse from 'html-react-parser';
import PwaInstaller from '../components/pwa-installer/PwaInstaller';
import { CLIENT_URL } from '../config/clientUrl';

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

export default function DownloadApp({ match }) {
    const [userName, setUserName] = useState(match.params.userName);
    const [run, setRun] = useState(false);
    console.log(run);

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
                <p className="text-rem-5 text-left text-default">Ei, {truncate(userName.cap(), isSmall ? 10 : 30)}</p>
                <div className="text-rem-2-5">
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
                </div>
            </div>
        </div>
    );

    return (
        <div id="holder" className="text-white gradient-animation" style={{minHeight: '300vmin'}}>
            {showMainText()}
            <PwaInstaller
                title={`<strong>${userName.cap()},<br />baixe nosso app aqui</strong><br />e tenha <strong>acesso rápido</strong><br />aos seus pontos de fidelidade.`}
                icon={`${CLIENT_URL}/favicon/android-chrome-192x192.png`}
                run={run}
            />
        </div>
    );
}