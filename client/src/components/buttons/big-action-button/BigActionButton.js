import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './pressedEffect.css'

BigActionButton.propTypes = {
    title: PropTypes.string.isRequired,
    fontAwesomeIcon: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    backColorOnHover: PropTypes.string,
}

export default function BigActionButton({
    title,
    color,
    backgroundColor,
    backColorOnHover,
    backColorOnKey,
    fontAwesomeIcon
}) {
    const styles = {
        color: color || "var(--mainWhite)",
        backgroundColor: backgroundColor || "var(--mainDark)",
        outline: 'none',
        border: 'none',
        fontWeight: 'bolder',
        fontSize: '1.5em',
        padding: '25px 35px',
        borderRadius: '20px',
    }
    return (
        <button
            style={styles}
            className="pressed-effect d-flex text-shadow align-items-center"
            onMouseOver={e => e.target.style.backgroundColor=backColorOnHover}
            onMouseOut={e => e.target.style.backgroundColor=backgroundColor}
            onKeyDown={e => e.target.style.backgroundColor=backColorOnKey}
        >
            {title}
            <i
                onMouseOver={e => e.target.style.backgroundColor=backColorOnHover}
                onMouseOut={e => e.target.style.backgroundColor=backgroundColor}
                onKeyDown={e => e.target.style.backgroundColor=backColorOnKey}
                className={`${fontAwesomeIcon} text-em-1-9 ml-3`}
            >
            </i>
        </button>
    );
}

