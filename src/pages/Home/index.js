//useState - hooks para acesso ao estado
import React, { useState, useEffect } from 'react';

// acessando state com hooks
import { useDispatch, useSelector } from 'react-redux';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

export default function Home() {

    // inicia o state product com array vazio
    const [products, setProducts] = useState([]);

    // retornando o stado do redux
    const amount = useSelector(state => state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount;
        return amount;
    }, {}),)

    // implenentando acesso a actions do redux com useDispatch
    const dispatch = useDispatch();

    // useEffect - hooks que simula o componente didMount, executa quando o componente form montado
    useEffect(() => {

        async function loadProducts() {
            const response = await api.get('products');

            const data = response.data.map(product => ({
                ...product,
                priceFormatted: formatPrice(product.price),
            }));

            setProducts(data);
        }

        loadProducts();
    }, []); // array vazio, essa funcao sera executada apenas uma vez


    // não usa useCallback, porque não tem dependencia de alteração de variavel dentro dela
    function handleAddProduct(id) {
        // implantado sem bindActionCreators do redux
        // dispatch usado para disparar uma action ao redux
        // const { dispatch } = this.props;
        // dispatch - action que informa ao redux que sera feita uma alteração no estado da app, todos reducer
        // disparando a action ADD_TO_CART que sera ouvida pelo reducer cart
        // dispatch(CartActions.addToCart(product));


        // disparando action do saga
        dispatch(CartActions.addToCartRequest(id));
    };

    return (
        <ProductList>
            { products.map(product => (
                <li key={ product.id }>
                    <img src={ product.image }
                        alt={ product.title }
                    />
                    <strong>
                        { product.title }
                    </strong>
                    <span>{ product.priceFormatted }</span>

                    <button type="button"
                        onClick={ () => handleAddProduct(product.id) }>
                        <div>
                            <MdAddShoppingCart size={ 16 } color="#FFF" /> { ' ' }
                            { amount[product.id] || 0 }
                        </div>

                        <span>ADICIONAR AO CARRINHO</span>
                    </button>
                </li>
            ))
            }
        </ProductList>
    );
}
