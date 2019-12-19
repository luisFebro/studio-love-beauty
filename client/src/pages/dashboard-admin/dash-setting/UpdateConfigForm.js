import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import handleChangeForm from '../../../utils/form/use-state/handleChangeForm';
import ToggleVisibilityPassword from '../../../components/forms/fields/ToggleVisibilityPassword';
import ButtonMulti from '../../../components/buttons/material-ui/ButtonMulti';
// Redux
import { useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import { readAdmin, updateConfig, readVerificationPass } from '../../../redux/actions/adminActions';

export default function UpdateConfigForm() {
    const [data, setData] = useState({
        trademark: '',
        siteBackgroundColor: '',
        verificationPass: '',
        formData: new FormData(),
    })
    const { trademark, siteBackgroundColor, verificationPass, formData } = data;
    console.log(siteBackgroundColor)
    const dispatch = useStoreDispatch();

    const getBackgroundColor = () => {
        readAdmin(dispatch)
        .then(res => {
            // if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setData({
                ...data,
                siteBackgroundColor: res.data.siteBackgroundColor
            })
        })
    }

    const init = () => {
        readVerificationPass()
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            setData({
                ...data,
                verificationPass: res.data.verificationPass
            })
            getBackgroundColor()
        })
    }

    useEffect(() => {
        init();
    }, [])

    const updateData = () => {
        updateConfig(dispatch, formData)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            showSnackbar(dispatch, "A sua configuração foi efutuada", 'success');
        })
    }

    const showImageUploader = () => (
        <div className="mt-4">
            <p className="text-default font-weight-bold">Trocar Imagem da Logomarca:</p>
            <input
                accept="image/*"
                onChange={handleChangeForm(setData, data, formData, "trademark")}
                name="trademark"
                style={{ display: 'none'}}
                id="contained-button-file"
                type="file"
            />
            <label htmlFor="contained-button-file">
                <ButtonMulti
                    onClick={null}
                    color="var(--mainWhite)"
                    component="span"
                    backgroundColor="var(--mainDark)"
                    backColorOnHover="var(--mainDark)"
                    iconFontAwesome="fas fa-upload"
                    textTransform='uppercase'
                >
                  Nova Imagem
                </ButtonMulti>
            </label>
        </div>
    );

    const showVerificationPassField = () => (
        <div className="mt-4">
            <p className="text-default font-weight-bold">Mudar senha de verificação:</p>
            <ToggleVisibilityPassword
                showForgotPass={false}
                onChange={handleChangeForm(setData, data, formData)}
                data={data}
                label=" "
                name="verificationPass"
                value={verificationPass}
                setData={setData}
            />
        </div>
    );

    const showColorPicker = () => (
        <div className="mt-4">
            <p className="text-default my-2 font-weight-bold">Escolha outra cor de fundo do site:</p>
            <div className="d-flex flex-row">
                <div className="mr-3 font-weight-bold">
                    Clique e Selecione:
                </div>
                <div className="input-color-container mr-3">
                    <input
                        onChange={handleChangeForm(setData, data, formData)}
                        name="siteBackgroundColor"
                        className="input-color"
                        type="color"
                        value={data && siteBackgroundColor}
                    />
                </div>
            </div>
        </div>
    );

    const showActionButton = () => (
        <div className="my-2">
            <ButtonMulti
                onClick={() => {
                    updateData();
                    showSnackbar(dispatch, 'Salvando suas preferências...');
                }}
                color="var(--mainWhite)"
                backgroundColor="var(--mainPink)"
                backColorOnHover="var(--mainPink)"
                iconFontAwesome="fas fa-save"
                textTransform='uppercase'
            >
                Salvar
            </ButtonMulti>
        </div>
    );
    return (
        <Card
            className="container-center"
            style={{margin: '0 auto 600px', width: '80%'}}>
            <form>
                {showImageUploader()}
                {showVerificationPassField()}
                {showColorPicker()}
                {showActionButton()}
            </form>
        </Card>
    );
}