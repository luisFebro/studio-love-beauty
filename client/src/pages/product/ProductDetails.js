import React, { useEffect, useState, useCallback } from 'react';
import Title from '../../components/Title';
import RelatedProducts from './RelatedProducts';
import { useStoreDispatch } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { readProduct, loadRelatedProducts } from '../../redux/actions/productActions';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import ProductImgGallery from './ProductImgGallery';
import ProductInfos from './ProductInfos';
import {
    ButtonContainerPressedEffectDark as DarkBtn,
    ButtonContainerPressedEffectYellow as YellowBtn
} from '../../components/buttons/Default';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ProductDetails({ match }) {
    let dashedTitle = match.params.dashedName;
    const [data, setData] = useState({}); // n1
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { _id, title } = data;
    const inCart = false;

    const dispatch = useStoreDispatch();

    const loadProducts = useCallback(dashedName => {
        readProduct(dispatch, dashedName)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
            setData(res.data);
            const dataProduct = { id: res.data._id, limit: 4 }
            loadRelatedProducts(dispatch, dataProduct)
            .then(res => {
                if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
                setRelatedProducts(res.data);
            })

        })
    }, [dispatch])

    useEffect(() => {
        let unmounted = false;
        if(!unmounted) {
            loadProducts(dashedTitle)
        }

        return () => { unmounted = true; }
    }, [loadProducts, dashedTitle])

    const showTitle = () => (
        <div>
            {title
            ? <Title title={`${title} (${data.refCode})`} color="black" />
            : <Skeleton variant="text" height={30} width={'70%'} style={{margin: 'auto'}} />}
        </div>
    );

    const showActionButtons = () => (
        <div className="container-center mt-5">
            <Link to="">
                <DarkBtn>Vitrine</DarkBtn>
                <YellowBtn
                    cart
                    disabled={inCart ? true : false}
                    onClick={() => {
                        // value.addToCart(id);
                    }}
                >
                    {inCart ? 'No carrinho adicionado' : 'adicionar no carrinho'}
                </YellowBtn>
            </Link>
        </div>
    );

    return (
        <div className="container py-5">
            {showTitle()}
            <div className="row">
                <ProductImgGallery _id={_id} title={title} thisUrl={dashedTitle} />
                <ProductInfos data={data} />
            </div>
            {showActionButtons()}
            <RelatedProducts relatedProds={relatedProducts}/>
        </div>
    );
}



/* COMMENTS
n1: LESSON:
useState({}) is the default initial value to fetch data with skeleton loading.
Check for data with each object´s property like destructuring object which will return empty/undefined if the object is not already fetched.
use isLoading conditional with API for tradicitional loading indicators.
*/