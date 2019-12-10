import React, { Fragment, useEffect, useState } from 'react';
// Redux
import { useStoreState } from 'easy-peasy';
import { loadFavoriteProducts } from '../../redux/actions/productActions';
// End Redux
import Product from '../../components/_layout/products/Product';
import Title from '../../components/Title';
import parse from 'html-react-parser';
import Illustration from '../../components/Illustration';

export default function Favorites() {
    const [favProducts, setFavProducts] = useState([]);
    const [run, setRun] = useState(""); // n1

    const { name, userId, favCount } = useStoreState(state => ({
        name: state.userReducer.cases.currentUser.name,
        userId: state.userReducer.cases.currentUser['_id'],
        favCount: state.userReducer.cases.currentUser.favoriteList,
    }));

    const loadFavoriteList = userId => {
        loadFavoriteProducts(userId)
        .then(res => {
            // if(res !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
            setFavProducts(res.data);
        })
    }

    useEffect(() => {
        let unmounted = false;
        if(userId && !unmounted) {
            loadFavoriteList(userId);
        }

        return () => { unmounted = true; };
    }, [userId, run])

    const showEmptyContent = () => (
        <Illustration
            title='Sua Galeria está vazia...'
            img='img/illustrations/empty-content.svg'
            actionButton={{
                btnName: "dark",
                txt: "Escolher seus favoritos",
            }}
        />
    );

    const showFavProducts = () => {
        const favList = favProducts.map(product => {
            return <Product
                        key={product._id}
                        product={product}
                        isFromFavPage={true}
                        setRun={setRun}
                    />;
        })

        return(
            <Fragment>
                {favCount.length !== 0
                ? (
                    <div className="py-2">
                        <div className="container">
                            <div className="row">
                                {favList}
                            </div>
                        </div>
                    </div>
                )
                : showEmptyContent()
                }
            </Fragment>

        );
    };

    const userAuthenticatedContent = () => (
        <Fragment>
            <Title title={`Seus Favaritos, ${name}`} />
            {showFavProducts()}
        </Fragment>
    );

    const visitorContent = () => (
        <Title
            title={`Faça seu Acesso`}
            subTitle={parse(`Você precisa de uma conta para acessar seus favoritos. <br/> Click já no ícone de usuário alí em cima`)}
        />
    );

    const showPage = () => (
        <Fragment>
            {name ? userAuthenticatedContent() : visitorContent()}
        </Fragment>
    );

    return (
        <Fragment>
            {showPage(name)}
        </Fragment>
    );
}

/* COMMENTS
n1: LESSON: do not use a static value like true for run state. This will update only once the useEffece since it is not changed. I used uuid to generate different Ids instead.
*/