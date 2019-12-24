import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Customized Data
import { useStoreDispatch } from 'easy-peasy';
import ButtonFab from '../../components/buttons/material-ui/ButtonFab';
import { findAnItem } from '../../redux/actions/globalActions';
import { showModalConfYesNo, showModalSelect } from '../../redux/actions/modalActions';
// End Customized Data

ExpansiblePanel.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            mainHeading: PropTypes.string.isRequired,
            secondaryHeading: PropTypes.string.isRequired,
            hiddenContent: PropTypes.any
        })
    ),
    ToggleButton: PropTypes.element,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        margin: 'auto',
    },
    heading: {
        fontSize: '1em',
        fontWeight: 'bold',
        flexBasis: '33.33%',
        flexShrink: 0,
        textShadow: '1px 1px 3px black'
    },
    secondaryHeading: {
        paddingLeft: '10px',
        fontSize: theme.typography.pxToRem(15),
        textShadow: '1px 1px 3px black'
    }
}));

export default function ExpansiblePanel({
    actions, backgroundColor, ToggleButton, color, allUsers }) {
    const classes = useStyles();

    const dispatch = useStoreDispatch();
    // const [expanded, setExpanded] = React.useState(false);

    // const handleChange = panel => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    const styles = {
        expansionPanelContainer: {
            position: 'relative',
        },
        expansionPanel: {
            color: color,
            backgroundColor: backgroundColor, // default is paper color
            margin: '35px 0',
        },
        button1: {
            transform: 'translate(-50%, -50%)'
        },
        button2: {
            transform: 'translate(-50%, -50%)'
        },
        iconContainer: {
            position: 'absolute',
            top: -10,
            left: 10
        },

    }

    const showUpperConfigBtns = panel => (
        <div>
            <ButtonFab
                iconFontAwesome="fas fa-plus"
                top={-30}
                left={40}
                style={styles.button1}
                iconMarginLeft="0"
                iconFontAwesome="fas fa-trash-alt"
                backgroundColor='#4834d4'
                onClick={() => {
                const attachedObj = {
                    action: {
                        noun: 'Exclusão',
                        verb: 'Excluir'
                    },
                    mainSubject: 'Usuário'
                };
                findAnItem(dispatch, allUsers, panel._id, attachedObj);
                showModalConfYesNo(dispatch);
            }}
            />
            <ButtonFab
                top={-27}
                left={90}
                title="trocar tipo usuário"
                variant="extended"
                iconFontAwesome="fas fa-user-plus"
                style={styles.button2}
                backgroundColor="grey"
                onClick={() => {
                    const attachedObj = { mainSubject: 'Função Usuário' };
                    findAnItem(dispatch, allUsers, panel._id, attachedObj);
                    showModalSelect(dispatch);
                }}
            />
        </div>
    );

    const showPanel = panel => (
        <ExpansionPanelSummary
            expandIcon={
                <div
                    style={styles.iconContainer}
                    className="enabledLink"
                >
                    {true
                    ? ToggleButton
                    : <ExpandMoreIcon />
                    }
                </div>
            }
            aria-controls={`panel${panel._id}bh-content`}
            id={`panel${panel._id}bh-header`}
        >
            <Typography
                className={clsx(classes.heading, "text-title")}
            >
                {panel.mainHeading}
            </Typography>
            <Typography
                className={classes.secondaryHeading}
            >
                {panel.secondaryHeading}
            </Typography>
        </ExpansionPanelSummary>
    );

    const showHiddenPanel = panel => (
        <ExpansionPanelDetails>
            {panel.hiddenContent}
        </ExpansionPanelDetails>
    );

    return (
        <div className={classes.root}>
            {actions.map(panel => (
                <div
                    key={panel._id}
                    style={styles.expansionPanelContainer}
                >
                    <ExpansionPanel
                        style={styles.expansionPanel}
                        className="disabledLink"
                    >
                        {showPanel(panel)}
                        {showHiddenPanel(panel)}
                    </ExpansionPanel>
                    {showUpperConfigBtns(panel)}
                </div>
            ))}
        </div>
    );
}
