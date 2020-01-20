import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import truncateWords from '../utils/string/truncateWords';
import { HashLink } from 'react-router-hash-link';
import { ButtonContainerPressedEffectDark as Dark } from '../components/buttons/Default';
import parse from 'html-react-parser';

const isSmall = window.Helper.isSmallScreen();

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
        truncatedLimit: PropTypes.number,
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
            leftPos,
            truncatedLimit,
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
                <div className="container-center">
                    <p
                        className={`move-txt-from-center ${txtBorder} ${txtStyle || "text-main-container"}`}
                        style={{
                            minWidth: `${isSmall ? "300px" : "500px"}`,
                            fontSize: fontSize || '2rem',
                            textAlign: txtAlign || "center",
                            color: txtColor || "black",
                            top: `${isSmall ? "35%" : topPos || "5%"}`,
                            left: leftPos || "50%",
                        }}
                    >
                        {parse(truncateWords(txt, truncatedLimit || 55))}
                    </p>
                </div>
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
