import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MultiIconButton from './MultiIconButton';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

SpeedDialButton.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.object)
};

const useStyles2 = makeStyles({
    tooltip: {
        fontSize: 15
    }
});

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 1501,
        top: 120,
        left: 50,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 100,
        transform: 'translateZ(0px)',
        flexGrow: 1
    },
    speedDialColor: {
        backgroundColor: 'var(--mainYellow)'
    },
    speedDial: {
        outline: 'none',
        position: 'absolute'
        // bottom: theme.spacing(2),
        // left: theme.spacing(2),
    },
    tooltip: {
        padding: '5px 10px',
        color: 'var(--mainWhite)',
        backgroundColor: 'var(--mainDark)',
        fontSize: '150px'
    }
}));

export default function SpeedDialButton({ actions }) {
    const classes = useStyles();
    const classes2 = useStyles2();
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Backdrop open={isOpen} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                hidden={false}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                style={{ outline: 'none' }}
                onClose={handleClose}
                onOpen={handleOpen}
                open={isOpen}
                direction="down"
            >
                {isOpen
                    ? actions.map(action => (
                          <SpeedDialAction
                              key={action.name}
                              icon={<MultiIconButton backColor={action.backColor} buttonIcon={action.icon} />}
                              tooltipTitle={action.name}
                              TooltipClasses={classes2}
                              onClick={() => {
                                  action.onClick();
                                  handleClose();
                              }}
                          />
                      ))
                    : null}
            </SpeedDial>
        </div>
    );
}
