import React, { Component } from 'react';

// connect - conecta com o estado do redux, qualquer classe ou function pode se conctar ao estado
// para tando deve estar cadastrada no rootReducer.js do redux e assim receber ou enviar
// informação ao mesmo atraves de connect
import { connect } from 'react-redux';

import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

class Home extends Component {

    state = {
        products: [],
    };

    async componentDidMount() {
        const response = await api.get('products');

        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
        }))

        this.setState({ products: data });

    }

    handleAddProduct = product => {
        // dispatch usado para disparar uma action ao redux
        const { dispatch } = this.props;

        // dispatch - action que informa ao redux que sera feita uma alteração no estado da app, todos reducer
        // disparando a action ADD_TO_CART que sera ouvida pelo reducer cart
        dispatch({
            type: 'ADD_TO_CART', // nome da action
            product, // obj enviando
        });
    };


    render() {
        const { products } = this.state;

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
                                onClick={() => this.handleAddProduct(product)}>
                            <div>
                                <MdAddShoppingCart size={ 16 } color="#FFF"></MdAddShoppingCart> 3
                         </div>

                            <span>ADICIONAR AO CARRINHO</span>
                        </button>
                    </li>
                ))
                }
            </ProductList>
        );
    }
}

// passando o Home para a funcao do conect e exportando
export default connect()(Home);
