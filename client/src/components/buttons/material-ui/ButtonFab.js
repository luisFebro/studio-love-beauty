import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import HowToRegIcon from '@material-ui/icons/HowToReg';

ButtonFab.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.element,
    variant: PropTypes.oneOf(["extended", "round"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    position: PropTypes.oneOf(["fixed", "absolute", "relative"]),
    top: PropTypes.number,
    left: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    iconFontAwesome: PropTypes.string,
    iconMarginLeft: PropTypes.string,
    iconFontSize: PropTypes.string,
    iconAfterClick: PropTypes.string,
    actionAfterClick: PropTypes.shape({
        setStatus: PropTypes.func,
        status: PropTypes.bool,
    }),
    onClick: PropTypes.func,
}

// NEED CHANGE ICON TO FONT AWESOME TOBE MORE FLEXIBLE
export default function ButtonFab({
    variant,
    position,
    size,
    top,
    right,
    left,
    color,
    backgroundColor,
    iconFontAwesome,
    iconAfterClick,
    actionAfterClick,
    iconMarginLeft,
    onClick,
    title }) {
    const [toggle, setToggle] = useState(false);

    const styles = {
        icon: {
            marginLeft: iconMarginLeft || '5px',
        },
        fab: {
            position: position || 'absolute',
            top: `${top || 0}px`,
            left: `${left || 0}px`,
            outline: 'none',
            color: color || 'var(--mainWhite)',
            backgroundColor:  backgroundColor || "#4834d4"
        }
    }

    const showIcon = iconFontAwesome => (
        iconFontAwesome &&
        <i style={styles.icon} className={toggle ? iconAfterClick : iconFontAwesome}></i>
    );

    const handleToggle = () => {
        setToggle(!toggle);
        actionAfterClick && actionAfterClick.setStatus(!actionAfterClick.status);
    }


    return (
        <Fab
            variant={variant || "round"}
            onClick={iconAfterClick ? handleToggle : onClick}
            size={ size || "small" }
            aria-label={title}
            style={styles.fab}
        >
            {title}
            {showIcon(iconFontAwesome)}
        </Fab>
    );
}