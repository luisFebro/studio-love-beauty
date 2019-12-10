import React, { Fragment } from 'react';
import { productInfoType } from '../../types';
import Skeleton from '@material-ui/lab/Skeleton';
import Spinner from '../../components/loadingIndicators/Spinner';

ProductInfos.propTypes = {
    data: productInfoType
}

export default function ProductInfos({ data }) {
    const { price, info, category, mainDescription } = data;

    const showCategory = () => (
        <h2
            className="text-uppercase text-muted mt-3 mb-2"
        >
            { category ? `categoria: ${category.name.cap()}` : <Skeleton variant="text" width={'55%'} /> }
        </h2>
    );

    const showPrice = () => (
        <h4 className="text-yellow">
            <strong>
                {price ? `preço: R$ ${price}` : <Skeleton variant="text" width={'30%'} />}
            </strong>
        </h4>
    );

    const showMainDesc = () => {

        const getDesc = () => (
            <Fragment>
                <h5 className="font-weight-bold mt-3 mb-0">
                    Descrição:
                </h5>
                <span>{mainDescription}</span>
            </Fragment>
        );

        return(
            <div className="text-default lead mx-auto text-justify">
                {mainDescription ? getDesc() : (
                    <Fragment>
                        <Skeleton variant="text" width={'35%'} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Fragment>
                )}
            </div>
        );
    }

    const additionalInfo = gotInfoProp => {
        const getColors = () => {
            // need to change colors to a singlearray of strings
            const colors = info.colors.map(color => `${color}, `);
            return colors;
        }

        return !gotInfoProp ? (
            <Spinner expireSec={8} />
        ) : (
            <Fragment>
                {info.company &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    marca: <span className="text-muted lead">{info.company.cap()}</span>
                </h5>}

                {info.howToUse &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Como usar: <span className="text-muted lead">{info.howToUse.cap()}</span>
                </h5>}

                {info.colors &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Cores Disponíveis: <span className="text-muted lead">{getColors()}</span>
                </h5>}

                {info.weight &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Peso: <span className="text-muted lead">{info.weight}</span>
                </h5>}

                {info.sizeOrDimmension &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Dimensão: <span className="text-muted lead">{info.sizeOrDimmension}</span>
                </h5>}

                {info.unitsPerPackage &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Unidades por Pacote: <span className="text-muted lead">{info.unitsPerPackage}</span>
                </h5>}
            </Fragment>
        );
    };

    return (
       <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
           {showCategory()}
           {showPrice()}
           {showMainDesc()}
           {additionalInfo(info)}
       </div>
    );
}