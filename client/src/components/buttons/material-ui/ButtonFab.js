import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import HowToRegIcon from '@material-ui/icons/HowToReg';

ButtonFab.propTypes = {
    variant: PropTypes.oneOf(["extended", "round"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
    icon: PropTypes.element,
}


const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginLeft: theme.spacing(1),
    },
}));
// NEED CHANGE ICON TO FONT AWESOME TOBE MORE FLEXIBLE
export default function ButtonFab({
    variant,
    size,
    top,
    right,
    left,
    bottom,
    backgroundColor,
    onClick,
    title }) {
    const classes = useStyles();

    return (
        <Fab
            variant={variant || "round"}
            onClick={onClick}
            size={ size || "small" }
            aria-label={title}
            className={classes.fab}
            style={{
                position: 'absolute',
                top: `${top || 0}px`,
                right: `${right || 0}px`,
                left: `${left || 0}px`,
                bottom: `${bottom || 0}px`,
                outline: 'none',
                color: 'var(--mainWhite)',
                backgroundColor:  backgroundColor || "#4834d4"
            }}
        >
            {title}
            <HowToRegIcon className={classes.extendedIcon} />
        </Fab>
    );
}