import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Illustration from '../Illustration';
import { CLIENT_URL } from '../../config/clientUrl';

SearchResult.propTypes = {
    filteredUsersLength: PropTypes.number,
    allUsersLength: PropTypes.number,
    isLoading: PropTypes.bool,
    searchTerm: PropTypes.string,
}

export default function SearchResult({
    isLoading, filteredUsersLength, allUsersLength, searchTerm }) {
    return (
        <div className="text-main-container my-5">
            {!filteredUsersLength
            ? (
                <Fragment>
                    {!isLoading && (
                        <Illustration
                            img={`${CLIENT_URL}/img/illustrations/empty-search.svg`}
                            alt="Busca Vazia"
                            imgStyle={{
                                maxWidth: 400
                            }}
                            txtImgConfig = {{
                                txt: `Nenhum usuário foi encontrado para ${searchTerm.toUpperCase()}`,
                                txtStyle: "text-title",
                                txtBorder: "border-white",
                            }}
                        />
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    {searchTerm !== ""
                    ? (
                        <div>
                            <h2 className="text-sub-title text-left pl-5">
                                Usuários Encontrados: <strong>{filteredUsersLength}</strong>
                            </h2>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-sub-title text-left pl-5">
                                Total de Usuários: <strong>{allUsersLength}</strong>
                            </h2>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
}