import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cpfMaskBr from '../../../utils/validation/masks/cpfMaskBr';

Keyboard.propTypes = {
    keyboardType: PropTypes.oneOf(['numeric', 'cpf']).isRequired,
    setDisplay: PropTypes.func,
    display: PropTypes.string,
    handleClose: PropTypes.func,
    handleConfirm: PropTypes.func,
}

export default function Keyboard({
    keyboardType = 'numeric',
    setDisplay,
    display,
    handleClose,
    handleConfirm,
}) {

    const getValue = value => {

        const handleCpf = () => {
            if(display === "Digite 11 dígitos...") {
                return setDisplay(value);
            }

            if(display.length < 11 && display.length >= 1) {
                setDisplay(display += value)
            }

            if(display.length === 11) {
                const maskCpf = cpfMaskBr(display)
                console.log(maskCpf)
                setDisplay(maskCpf);
            }
        }

        if(keyboardType === 'cpf') {
            handleCpf();
        }

        keyboardType === 'numeric' && (
            display.charAt(0) === "0"
            ? setDisplay(value)
            : setDisplay(display += value)
        )
    }

    const eraseLastChar = () => {
        display.length === 1
        ? setDisplay("0")
        : setDisplay(display.slice(0, -1));
    }

    return (
        <GridContainer>
            <div onClick={() => getValue("1")} className="item1">1</div>
            <div onClick={() => getValue("2")} className="item2">2</div>
            <div onClick={() => getValue("3")} className="item3">3</div>
            <div onClick={() => eraseLastChar()} className="d-flex align-items-center  flex-row justify-content-center erase-last side-btn">
                <i style={{fontSize: '1.3em'}} className="fas fa-arrow-left mr-3"></i>
                Corrigir
            </div>
            <div onClick={() => getValue("4")} className="item4">4</div>
            <div onClick={() => getValue("5")} className="item5">5</div>
            <div onClick={() => getValue("6")} className="item6">6</div>
            <div onClick={handleClose} className="d-flex align-items-center justify-content-center cancel side-btn">
                <i style={{fontSize: '1.3em'}} className="fas fa-times mr-3"></i>
                Cancelar
            </div>
            <div onClick={() => getValue("7")} className="item7">7</div>
            <div onClick={() => getValue("8")} className="item8">8</div>
            <div onClick={() => getValue("9")} className="item9">9</div>
            <div onClick={handleConfirm} className="d-flex flex-column justify-content-center confirm side-btn">
                <i style={{fontSize: '1.9em'}} className="fas fa-check"></i>
                Confirmar
            </div>
            <div className="empty"></div>
            <div onClick={() => getValue("0")} className="item0">0</div>
            <div
                onClick={() => getValue(",")}
                className="comma"
            >
                {keyboardType === 'numeric' ? "," : ""}
            </div>
        </GridContainer>
    );
}

const GridContainer = styled.div`
    & {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 40%;
        grid-gap: 5px;
        background-color: var(--mainDark);
        padding: 10px;
        font-size: 100%;
    }

    & > div {
        background: linear-gradient(to right, #16222a, #3a6073);
        color: white;
        font-weight: bolder;
        text-align: center;
        text-shadow: 1px 1px 3px black;
        padding: 10px 0;
        font-size: 2em;
        border-radius: 15px;
    }

    & > div:active {
        background: white;
    }

    & > div:hover {
        position: relative;
        top: 1px;
        left: 1px;
        border-color: #e5e5e5;
        cursor: pointer;
    }

    .side-btn {
        font-size: 1.4em;
    }

    & .erase-last {
        background: #fbc531;
    }

    & .cancel {
        background: #EA2027;
    }

    & .confirm {
        background: #4cd137;
        grid-column: 4;
        grid-row: 3 / span 2;
    }
`;


