import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import truncateWords from '../utils/string/truncateWords';
import { HashLink } from 'react-router-hash-link';
import { ButtonContainerPressedEffectDark as Dark } from '../components/buttons/Default';

Illustration.propTypes = {
    img: PropTypes.string.isRequired,
    imgStyle: PropTypes.object,
    title: PropTypes.node,
    alt: PropTypes.string,
    actionButton: PropTypes.shape({
        btnName: PropTypes.string.isRequired,
        txt: PropTypes.string.isRequired,
        alt: PropTypes.string,
        to: PropTypes.string,
    }),
    txtImgConfig: PropTypes.shape({
        txt: PropTypes.node.isRequired,
        fontSize: PropTypes.string,
        txtStyle: PropTypes.string,
        txtColor: PropTypes.string,
        txtAlign: PropTypes.string,
        txtBorder: PropTypes.string,
        topPos: PropTypes.string,
        leftPos: PropTypes.string,
    })
}

export default function Illustration({
    title,
    img,
    imgStyle,
    alt = "conteúdo da página está vazio",
    actionButton = {},
    txtImgConfig = {} }) {

    const { txt,
            txtColor,
            txtStyle,
            fontSize,
            txtAlign,
            txtBorder,
            topPos,
            leftPos
        } = txtImgConfig;

    const showActionButton = (actionButton) => {
        const { btnName, txt, to } = actionButton;
        return(
            btnName === "dark" &&
            <div className="container-center">
                <HashLink smooth to={to || "/#inicio"}>
                    <Dark className="mt-5">{txt}</Dark>
                </HashLink>
            </div>
        );
    }

    return (
        <Fragment>
            <h2 className="text-center text-sub-title-upper">{title}</h2>
            <DivWrapper className="container-center">
                <img
                    style={imgStyle}
                    className="image-center tranparent-img-shadow"
                    src={img}
                    alt={alt}
                />
                <p
                    className={`move-txt-from-center ${txtBorder} ${txtStyle || "text-main-container"}`}
                    style={{
                        minWidth: '500px',
                        fontSize: fontSize || '2rem',
                        textAlign: txtAlign || "center",
                        color: txtColor || "black",
                        top: topPos || "5%",
                        left: leftPos || "50%",
                    }}
                >
                    {truncateWords(txt, 55)}
                </p>
            </DivWrapper>
            {showActionButton(actionButton)}
        </Fragment>
    );
}

const DivWrapper = styled.div`
    position: relative;

    .move-txt-from-center {
        font-size: 1.3em;
        position: absolute;
        transform: translate(-50%, -50%);
    }

    // BORDERS
    .border-white {
        //border in the font
        text-shadow: -2px 0 #fff, 0 2px #fff, 2px 0 #fff, 0 -2px #fff;
    }
`;
