import React from 'react';
import PropTypes from 'prop-types';

Title.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object]),
    subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), // n1
    color: PropTypes.string,
}

export default function Title({ title, subTitle, color }) {
    //Render
    const showSubTitle = subTitle => (
        subTitle &&
        <h4 className="text-sub-title mt-3">
            {subTitle}
        </h4>
    );

    return (
        <div id="inicio" style={{ marginTop: '40px' }} className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h1 className="text-title font-weight-bold">
                    <strong
                        style={{color: (color ? color : "var(--mainRed)")}}
                    >
                        {title && typeof title === 'string' ? title.cap() : null}
                    </strong>
                </h1>
                {showSubTitle(subTitle)}
            </div>
        </div>
    );
}

/* COMMENTS
n1: node because it may be a string, but also an array with parse-html-react.
*/