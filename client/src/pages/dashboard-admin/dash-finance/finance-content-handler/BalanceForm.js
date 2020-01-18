import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useStoreDispatch, useStoreState } from 'easy-peasy';
import { CLIENT_URL } from '../../../../config/clientUrl';
import ButtonMulti from '../../../../components/buttons/material-ui/ButtonMulti';
import handleChange from '../../../../utils/form/use-state/handleChange';
import TextField from '@material-ui/core/TextField';
import { readServicesList } from '../../../../redux/actions/adminActions';


export default function BalanceForm({ isExpenseForm = false }) {
    const [data, setData] = useState({
        paymentType: 'dinheiro',
        agentName: 'selecione nome:',
        installmentsIfCredit: 2,
        cashInValue: null,
        cashOutValue: null,
        description: '',
        service: 'outros',
        adminNamesList: [],
        // do not change
        statusCheck: 'pago',
        agentRole: 'admin',
    })
    const {
        paymentType,
        installmentsIfCredit,
        agentName,
        cashInValue,
        cashOutValue,
        description,
        service,
        adminNamesList,
    } = data;

    const { servicesList } = useStoreState(state => ({
        servicesList: state.adminReducer.cases.services,
    }));
    const dispatch = useStoreDispatch();

    useEffect(() => {
        readServicesList(dispatch);
    }, [])

    const styles = {
        root: {
            width: '100%',
        },
        mainContent: {
            display: 'flex',
            flexBasis: '90%',
            justifyContent: 'center',
            minHeight: 'auto' //temp
        },
        form: {
            maxWidth: '400px',
            background: 'var(--incomeGreen)',
            borderRadius: '10px',
            padding: '25px'
        },
        fieldForm: {
            backgroundColor: 'var(--mainWhite)',
            textAlign:'center',
            zIndex: 2000
        },
        fieldFormValue: {
            backgroundColor: 'var(--mainWhite)',
            fontSize: '2.1em',
            zIndex: 2000
        },
        icon: {
            top: '-40px', left: '-30px',
            animationIterationCount: 2,
        }
    }

    const handleSubmit = saveType => {

    }

    const showForm = () => (
        <form style={styles.form} className="position-relative">
            <div style={styles.icon} className="animated rotateIn delay-1 position-absolute">
                <img
                    src={`${CLIENT_URL}/img/icons/${isExpenseForm ? "less.svg" : "plus.svg"}`}
                    width={60}
                    height="auto"
                    alt="icone mais/menos"
                />
            </div>
            <div>
                <span className="text-white text-default text-em-1.5 font-weight-bold">
                    {`VALOR ${isExpenseForm ? "QUE SAIU:*" : "QUE ENTROU:*"}`}
                    <TextField
                        placeholder="0,00"
                        InputProps={{
                            style: styles.fieldFormValue, // alignText is not working here... tried input types and variations
                        }}
                        name={`${isExpenseForm ? "cashOutValue" : "cashInValue"}`}
                        value={isExpenseForm ? cashOutValue : cashInValue}
                        onChange={handleChange(setData, data)}
                        variant="outlined"
                        autoComplete="off"
                        helperText={"Insira apenas números e vírgula"}
                        fullWidth
                    />
                </span>
            </div>
            <div className="mt-3">
                <span className="text-white text-default text-em-1 font-weight-bold">
                    DESCRIÇÃO*:
                    <TextField
                        style={styles.fieldForm}
                        name="description"
                        value={description}
                        onChange={handleChange(setData, data)}
                        variant="outlined"
                        autoComplete="off"
                        multiline
                        rows={1}
                        fullWidth
                    />
                </span>
            </div>
            <div className="mt-3">
                <span className="text-white text-default text-em-1 font-weight-bold">
                    ADMINISTRADOR*:
                    <Select
                      style={styles.fieldForm}
                      labelId="staff"
                      fullWidth
                      variant="outlined"
                      name="agentName"
                      value={agentName}
                      onChange={handleChange(setData, data)}
                    >
                        <MenuItem value={agentName}>
                          selecione nome:
                        </MenuItem>
                        <MenuItem value={'Fabiano'}>Fabiano</MenuItem>
                        <MenuItem value={'Adriane'}>Adriane</MenuItem>
                    </Select>
                </span>
            </div>
            <div className="mt-3">
                <span className="text-white text-default text-em-1 font-weight-bold">
                    FORMA DE PAGAMENTO:
                    <Select
                      style={styles.fieldForm}
                      fullWidth
                      variant="outlined"
                      name="paymentType"
                      value={paymentType}
                      onChange={handleChange(setData, data)}
                    >
                        <MenuItem value={paymentType}>
                          dinheiro
                        </MenuItem>
                        <MenuItem value={'crédito'}>crédito</MenuItem>
                        <MenuItem value={'débito'}>débito</MenuItem>
                    </Select>
                </span>
            </div>
            {paymentType === "crédito"
            ? (
                <div className="animated zoomIn mt-3">
                    <span className="text-white text-default text-em-1 font-weight-bold">
                        QTDE. PARCELAS:
                        <br />
                        <TextField
                          InputProps={{
                              style: {fontSize: '2em', width: '80px', backgroundColor: 'var(--mainWhite)',},
                              inputProps: { min: 2, max: 12 }
                          }}
                          variant="outlined"
                          type="number"
                          name="installmentsIfCredit"
                          value={installmentsIfCredit}
                          onChange={handleChange(setData, data)}
                        />
                    </span>
                </div>
            ) : null}
            <div className="mt-3">
                {isExpenseForm
                ? null
                : (
                    <span className="text-white text-default text-em-1 font-weight-bold">
                        SERVIÇO:
                        <Select
                          style={styles.fieldForm}
                          labelId="service"
                          fullWidth
                          variant="outlined"
                          name="service"
                          value={service}
                          onChange={handleChange(setData, data)}
                          onChange={null}
                        >
                            <MenuItem value={service}>
                              outros
                            </MenuItem>
                            {servicesList && servicesList.map(service => (
                                <MenuItem key={service._id} value={service.name}>
                                    {service.name.cap()}
                                </MenuItem>
                            ))}
                        </Select>
                    </span>
                )}
            </div>
            {showButtonActions()}
        </form>

    );

    const showButtonActions = () => (
        <div className="mt-4 mb-2 d-flex justify-content-between">
            <ButtonMulti
                title="Salvar + Novo"
                onClick={() => handleSubmit("save-and-new")}
                color="var(--mainWhite)"
                backgroundColor="var(--mainDark)"
                backColorOnHover="var(--mainDark)"
                iconFontAwesome="far fa-save"
                textTransform='uppercase'
            />
            <ButtonMulti
                title="SALVAR"
                onClick={() => handleSubmit("save")}
                color="var(--mainWhite)"
                backgroundColor="var(--mainDark)"
                backColorOnHover="var(--mainDark)"
                iconFontAwesome="fas fa-save"
                textTransform='uppercase'
            />
        </div>
    );

    return (
        <div>
            {showForm()}
        </div>
    );
}