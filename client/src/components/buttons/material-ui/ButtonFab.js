import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import HowToRegIcon from '@material-ui/icons/HowToReg';

ButtonFab.propTypes = {
    variant: PropTypes.oneOf(["extended", "round"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    top: PropTypes.number,
    left: PropTypes.number,
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
    title: PropTypes.string,
    icon: PropTypes.element,
}

// NEED CHANGE ICON TO FONT AWESOME TOBE MORE FLEXIBLE
export default function ButtonFab({
    variant,
    size,
    top,
    right,
    left,
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
            position: 'absolute',
            top: `${top || 0}px`,
            left: `${left || 0}px`,
            outline: 'none',
            color: 'var(--mainWhite)',
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