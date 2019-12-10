import React, { Fragment } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { CLIENT_URL } from "../config/clientUrl";
import PropTypes from 'prop-types';

ShowImgOrSkeleton.propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.string,
    setStatus: PropTypes.func.isRequired,
    status: PropTypes.bool,
    skeletonOpt: PropTypes.shape({
        variant: PropTypes.oneOf(['text', 'rect', 'circle']),
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired,
    imgOpt: PropTypes.shape({
        style: PropTypes.object,
        className: PropTypes.string,
        alt: PropTypes.string,
    })
}

export default function ShowImgOrSkeleton({ id, url, setStatus, status, skeletonOpt, imgOpt }) {
    const imageUrl = `${CLIENT_URL}/api/${url}/photo/${id}`;
    const { variant, width, height } = skeletonOpt;
    const { style, className, alt } = imgOpt;

    return(
        <Fragment>
            <div style={{ display: status ? 'block' : 'none'}}>
                <Skeleton variant={variant} width={width} height={height} style={style } />
            </div>
            <div style={{ display: status ? 'none' : 'block'}}>
                <img
                    className={className}
                    src={imageUrl}
                    alt={alt}
                    onLoad={() => setStatus(false)}
                />
            </div>
        </Fragment>
    );
}
