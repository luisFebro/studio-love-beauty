import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { buttonMultiType } from '../../../types';
import clsx from 'clsx';

ButtonMulti.propTypes = buttonMultiType;

const useStyles = makeStyles(theme => ({ // n1
    sText: {
        textShadow: '1px 1px 3px black',
        fontWeight: 'bold',
        textTransform: props => props.textTransform || 'uppercase',
    },
    sIcon: {
        marginLeft: '5px',
        fontSize: '1.9em'
    },
    sBtnColors: {
        color: props => props.color || 'var(--mainWhite)',
        backgroundColor: props => props.backgroundColor,
        '&:hover': {
            backgroundColor: props => props.backColorOnHover
        }
    },
    sBtnDefaultColors: {
        color: props => props.color || theme.palette.primary.main
    }
}));

const CustomizedButton = withStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        outline: 'none',
        boxShadow: false && '0 14px 34px rgba(0, 0, 0, 0.20), 0 10px 8px rgba(0, 0, 0, 0.12)' // soft shadow elevation
    }
}))(Button);

export default function ButtonMulti({
    children,
    title,
    size,
    fullWidth,
    onClick,
    iconFontAwesome,
    component="button",
    variant="contained",
    disabled,
    ...props }) {
    const { sText, sBtnColors, sBtnDefaultColors, sIcon } = useStyles(props);

    const showIcon = iconFontAwesome => (
        iconFontAwesome &&
        <i className={clsx(iconFontAwesome, sIcon)}></i>
    );

    return (
        <CustomizedButton
            className={(variant !== 'contained') ? sBtnDefaultColors : sBtnColors }
            onClick={onClick}
            size={size}
            variant={(variant === 'link') ? null : variant}
            color="primary"
            disabled={disabled}
            component={component}
        >
            <span className={variant === 'contained' ? sText : null}>{title || children}</span>
            {showIcon(iconFontAwesome)}
        </CustomizedButton>
    );
}


/* COMMENTS
n1: can also returns a single object like makeStyles({ someStyle: 'smt'})
*/