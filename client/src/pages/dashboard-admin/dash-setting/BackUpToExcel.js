import React, { useState, useEffect, Fragment } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useStoreDispatch, useStoreState } from 'easy-peasy';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import ButtonDropdown from '../../../components/buttons/material-ui/ButtonDropdown';
import parse from 'html-react-parser';

import { readAllDbFromModels } from '../../../redux/actions/adminActions';

const dbData = {
    users: {
        brDbName: 'usuários',
        dbModelName: 'user',
    },
    staffBookings: {
        brDbName: 'agendamentos',
        dbModelName: 'staffBooking',
    },
    finances: {
        brDbName: 'finanças',
        dbModelName: 'finance',
    }
};



export default function BackUpToExcel() {
    const [isThisLoading, setIsThisLoading] = useState(true);

    const [data, setData] = useState({
        dbDataList: [],
        brDbName: '',
        dbModelName: '',
        selectedButton: 'SELECIONE BOTÃO',
    })
    const { dbDataList, selectedButton, dbModelName, brDbName } = data;

    const isArrayReady = dbDataList.length !== 0;

    const { adminId } = useStoreState(state => ({
        adminId: state.userReducer.cases.currentUser._id,
    }))

    const dispatch = useStoreDispatch();

    useEffect(() => {
        if(adminId && selectedButton !== 'SELECIONE BOTÃO') {
            handleSubmit(adminId);
        }
    }, [selectedButton, adminId])

    const handleSubmit = adminId => {
        const securityObj = {
            adminId,
            token: '123',
        }

        setIsThisLoading(true);
        readAllDbFromModels(dispatch, securityObj, dbModelName)
        .then(res => {
            if(res.status !== 200) {
                showSnackbar(dispatch, res.data.msg, 'error')
                setIsThisLoading(false);
                return;
            }
            setData({
                ...data,
                dbDataList: res.data,
            })
            setIsThisLoading(false);
        })
    }

    const showDownloadableDataBtn = () => (
        <div>
            <ReactHTMLTableToExcel
                id="table-xls-button"
                className={selectedButton === "SELECIONE BOTÃO" ? "btn btn-primary d-none" : `btn btn-primary mt-5 ${isThisLoading ? 'disabledLink' : ''}`}
                table={brDbName}
                filename={brDbName}
                sheet={`Studio Love Beauty - banco de dados - ${brDbName}`}
                buttonText={isThisLoading ? "BAIXANDO... UM INSTANTE..." : "PRONTO PARA BAIXAR"}
            />
            <table id={brDbName} className="d-none">
                <thead>
                    <tr>
                        {isArrayReady && dbDataList.fields.map((field, ind) => (
                            <th key={ind}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dbDataList.length !== 0 && dbDataList.docs.map((doc, ind) => (
                        <tr key={ind}>
                            {dbDataList.fields.map((field, ind) => {
                                return <td key={ind}>{doc[field]}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const handleDbSelection = (selectedButton) => {
        switch(selectedButton) {
            case 'GERAR DADOS - USUÁRIOS':
                return 'users';
            case 'GERAR DADOS - AGENDAMENTOS':
                return 'staffBookings';
            case 'GERAR DADOS - FINANÇAS':
                return 'finances';
            default:
                console.log("none selected");
        }
    }

    const onSelectedValue = value => {
        if(value !== 'SELECIONE BOTÃO') {
            const model = handleDbSelection(value);
            setData({ ...data, selectedButton: value, brDbName: dbData[model].brDbName, dbModelName: dbData[model].dbModelName})
        }
    }

    return (
        <div className="my-5 container-center">
            <p className="text-left text-default font-weight-bold">Fazer cópia de dados do sistema via Excel:</p>
            <ButtonDropdown
                dropdown={{
                    titleOptions: ['SELECIONE BOTÃO', "GERAR DADOS - USUÁRIOS", "GERAR DADOS - AGENDAMENTOS", "GERAR DADOS - FINANÇAS"],
                }}
                onSelectedValue={value => onSelectedValue(value)}
            />
            {showDownloadableDataBtn()}
        </div>
    );
}