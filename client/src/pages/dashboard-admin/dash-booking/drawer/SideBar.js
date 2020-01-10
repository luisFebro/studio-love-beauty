import React, { useState, useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ButtonFab from '../../../../components/buttons/material-ui/ButtonFab';
import CloseButton from '../../../../components/buttons/CloseButton';
import PropTypes from 'prop-types';
import { useStoreDispatch , useStoreState } from 'easy-peasy';
import { showSnackbar } from '../../../../redux/actions/snackbarActions';
import TextField from '@material-ui/core/TextField';
//CUSTOM DATA
import {
    readServicesList,
    createService,
    updateService,
    deleteService } from '../../../../redux/actions/adminActions';
import handleChange from '../../../../utils/form/use-state/handleChange';
//END CUSTOM DATA

const truncate = (name, leng) => window.Helper.truncate(name, leng);


SideBar.propTypes = {
    drawer: PropTypes.shape({
        title: PropTypes.string,
        drawerData: PropTypes.array,
    }),
    onClose: PropTypes.func,
    open: PropTypes.bool,
}

export default function SideBar({ drawer, onClose, open }) {
    const currItemRef = useRef(null);
    const [data, setData] = useState({
        name: "",
        newName: "",
        needShowNewField: false,
        needShowUpdateField: false,
    });
    const { name, newName, needShowNewField, needShowUpdateField } = data;

    const { adminId } = useStoreState(state => ({
        adminId: state.userReducer.cases.currentUser._id,
    }));
    const dispatch = useStoreDispatch();

    const { title, drawerData } = drawer;

    const styles = {
        sidebar: {
            minWidth: '900px',
            position: 'relative',
        },
        servicesContainer: {
            width: '90%',
            margin: 'auto'
        },
        servicesItem: {
            maxWidth: '370px',
            whiteSpace: 'pre-line',
            backgroundColor: 'var(--mainDark)',
            color: 'var(--mainPink)',
            margin: '28px 0',
            padding: "20px 10px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5em"
        },
        newServiceForm: {
            minWidth: '240px',
        }
    }

    const handleItemRemoval = itemId => {
        showSnackbar(dispatch, "Excluindo...");
        deleteService(dispatch, adminId, itemId)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            readServicesList(dispatch);
            showSnackbar(dispatch, res.data.msg, 'success');
        })
    }

    const handleItemUpdate = itemId => {
        showSnackbar(dispatch, "Atualizando...");
        const objToSend = {
            name: newName,
        }

        updateService(dispatch, adminId, itemId, objToSend)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            readServicesList(dispatch);
            showSnackbar(dispatch, res.data.msg, 'success');
            clearForm()
        })
    }

    const handleNewService = () => {
        showSnackbar(dispatch, "Adicionando...");
        if(name === "") return showSnackbar(dispatch, "Insira o nome do serviço...")
        const objToSend = {
            name,
        }
        createService(dispatch, adminId, objToSend)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            readServicesList(dispatch);
            showSnackbar(dispatch, res.data.msg, 'success');
            clearForm();
        })
    }

    const toggleOrChangeStatusBtn = (key, itemId = null) => {
        const value = key === "needShowUpdateField" ? itemId : !needShowNewField;
        setData({ ...data, [key]: value});
    }

    const clearForm = () => {
        setData({
            name: '',
            newName: "",
            needShowNewField: false,
            needShowUpdateField: false,
        });
    }

    return (
        <Drawer
            style={styles.sidebar}
            open={open}
            onClose={onClose}
            anchor="right"
        >
            <div className="position-relative container-center flex-column">
                <p className="mx-5 my-4 text-main-container font-weight-bold">
                    {title}
                </p>
                <div className="container-center flex-column my-3">
                    <ButtonFab
                        backgroundColor="var(--mainPink)"
                        position="relative"
                        size="large"
                        iconFontAwesome={`${needShowNewField ? "fas fa-times" : "fas fa-plus"}`}
                        iconFontSize="1.8em"
                        iconMarginLeft="0"
                        onClick={() => toggleOrChangeStatusBtn("needShowNewField")}
                    />
                    <div style={styles.newServiceForm} className={`${needShowNewField ? "mt-4 container-center" : "d-none mt-4"}`}>
                        <TextField
                            label="INSIRA NOVO SERVIÇO AQUI"
                            name="name"
                            value={name}
                            onChange={handleChange(setData, data)}
                            variant="outlined"
                            autoComplete="off"
                            multiline
                            rows={2}
                            type="text"
                            fullWidth
                        />
                        <div className="mt-2">
                            <ButtonFab
                                backgroundColor="var(--mainDark)"
                                position="relative"
                                size="medium"
                                iconFontAwesome="fas fa-save"
                                iconFontSize="1.8em"
                                iconMarginLeft="0"
                                onClick={handleNewService}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-2 text-default">
                    {`Total: ${drawer.drawerData.length} Serviços.`}
                </div>
                <section style={styles.servicesContainer}>
                    {drawer.drawerData.length === 0
                    ? (
                        <h2 className="text-center my-5 text-default font-weight-bold">
                            Adicione um novo serviço
                        </h2>
                    ) : drawer && drawer.drawerData.map(item => (
                        <div key={item._id} className="position-relative">
                            <div className="text-default" style={styles.servicesItem}>
                                {needShowUpdateField === item._id
                                ? (
                                    <div>
                                        <h4 className="text-default">
                                            Novo Valor para:<br /><strong>{truncate(item.name, 60)}</strong>
                                        </h4>
                                        <div className="container-center input-group">
                                            <input
                                                className="form-control"
                                                type="text-area"
                                                rows="2"
                                                autocomplete="off"
                                                name="newName"
                                                value={newName}
                                                onChange={handleChange(setData, data)}
                                            />
                                            <button
                                                className="input-group-btn"
                                                style={{ width: '50px', border: 'none', outline: 'none', color: "white", backgroundColor: 'var(--mainPink)'}}
                                                onClick={() => handleItemUpdate(item._id)}
                                            >
                                                <i style={{fontSize: '1.3em'}} className="fas fa-save">
                                                </i>
                                            </button>
                                        </div>
                                    </div>
                                ) : item.name.cap()}
                            </div>
                            <ButtonFab
                                iconFontAwesome="fas fa-trash-alt"
                                backgroundColor="purple"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={215}
                                onClick={() => handleItemRemoval(item._id)}
                            />
                            <ButtonFab
                                iconFontAwesome="fas fa-pencil-alt"
                                backgroundColor="var(--mainPink)"
                                iconMarginLeft= '0px'
                                size="small"
                                top={-25}
                                left={260}
                                onClick={() => toggleOrChangeStatusBtn("needShowUpdateField", item._id)}
                            />
                        </div>
                    ))}
                </section>
                <CloseButton
                    onClick={onClose}
                    size="2.5em"
                    color="var(--mainWhite)"
                    top="15px"
                    right="345px"
                />
            </div>
        </Drawer>
    );
}