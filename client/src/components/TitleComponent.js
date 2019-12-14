import React from 'react';
import PropTypes from 'prop-types';

TitleComponent.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
}

export default function TitleComponent({ children, subtitle }) {
    return (
        <div
            className="text-weight-bold text-center text-main-container m-1 p-3"
            style={{ color: "var(--mainPink)", backgroundColor: "var(--mainDark)" }}
        >
            {children}
            <br />
            <span className="mt-2">
                {subtitle}
            </span>
        </div>
    );
}