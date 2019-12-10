import React from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { updateBusinessInfo } from '../../../redux/actions/adminActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
// End Redux
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(2)
    }
}));

export default function FirstBuyDiscount() {

    // Redux
    let { bizInfo } = useStoreState(state => ({
        bizInfo: state.adminReducer.cases.businessInfo
    }));

    const { isActivated } = bizInfo.bizPromotions.coupons.firstOrder;

    const dispatch = useStoreDispatch();
    // End Redux

    const classes = useStyles();

    const handleChecked = e => {
        const { checked } = e.target;

        const status = checked ? 'ativado' : 'desativado';
        showSnackbar(dispatch, `Desconto ${status}`, (status === 'ativado' ? 'success' : 'warning'));
        //update DB
        const key = `bizPromotions.coupons.firstOrder.isActivated`;
        const objToUpdate = {
            [key]: checked
        };
        updateBusinessInfo(dispatch, objToUpdate);
    };

    return (
        <div>
            <h2 className="text-center text-main-container mt-5">Desconto Primeira Compra</h2>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                <div>
                    {isActivated ? (
                        <div className="animated zoomIn slow">
                            <img src="gif/girl-turning.gif" alt="girl dancing" />
                            <h4 className="text-center animated zoomIn slow text-default mt-2">
                                Promoção aparecerá assim que o cliente se registrar.
                            </h4>
                        </div>
                    ) : (
                        <div>
                            <img
                                className="text-center animated zoomOut slow"
                                src="gif/girl-turning.gif"
                                alt="girl dancing"
                            />
                            <h4 className="text-center animated zoomIn slow text-default mt-2">
                                Nenhuma Promoção aparecerá para o cliente
                            </h4>
                        </div>
                    )}
                </div>
                <Paper className={classes.root}>
                    <div
                        className="mb-3"
                        style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <div className="mb-5">
                            <h4 className="text-sub-container">
                                Cupom Promocional <br /> Atual:
                            </h4>
                            <h4 className="text-sub-default">
                                <strong>10% de desconto</strong>
                            </h4>
                        </div>
                        <FormGroup column>
                            <FormControlLabel
                                label={
                                    isActivated ? (
                                        <span className="animated zoomIn slow">Ativada</span>
                                    ) : (
                                        <span className="animated zoomIn slow">Desativada</span>
                                    )
                                }
                                control={
                                    <Switch
                                        checked={isActivated}
                                        onChange={handleChecked}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                            />
                        </FormGroup>
                    </div>
                </Paper>
            </div>
            <p className="text-center text-default mt-5">
                Nota: Nas próximas atualizações, será possível personalizar a promoção assim como o valor ou a
                porcentagem do desconto.
            </p>
        </div>
    );
}
