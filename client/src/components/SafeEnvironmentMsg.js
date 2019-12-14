import React from 'react';

export default function SafeEnviromentMsg() {
    return (
        <div className="text-center my-2 font-weight-bold">
            <span style={{color: 'green'}}>
                <i className="fas fa-lock"></i>
            </span>   Ambiente seguro!<br />
            Envio de dados encriptografados<br />
            e mantidos de forma privada.
        </div>
    );
}