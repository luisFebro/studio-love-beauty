import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.updateLocale('pt-br');

CreatedAtBr.propTypes = {
    createdAt: PropTypes.string,
}

export default function CreatedAtBr({ createdAt }) {
    return (
       <div
           style={{backgroundColor: 'var(--mainDark)'}}
           className="text-center pt-3">
           <p>
               Conta criada em: {moment(createdAt).format('Do [de] MMMM, YYYY')}
               <br />
               {`${moment(createdAt).fromNow()} atrás.`}
           </p>
       </div>
    );
}