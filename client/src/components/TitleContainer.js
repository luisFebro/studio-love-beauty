import React from 'react';
import PropTypes from 'prop-types';

TitleContainer.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    color: PropTypes.string,
    my: PropTypes.string,
    className: PropTypes.string,
}

export default function TitleContainer({ title, subTitle, color, my, className }) {
    return (
        <div className={`${my || "my-2"} ${className} container-center`}>
            <h1
                className={`text-em-2-5 text-center text-main-container font-weight-bold`}
                style={{color: color}}
            >
                {title}
                <span className="mt-2 text-em-2-0">{subTitle}</span>
            </h1>
        </div>
    );
}