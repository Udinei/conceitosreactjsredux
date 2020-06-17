import React, { Component } from 'react';

// connect - conecta com o estado do redux, qualquer classe ou function pode se conctar ao estado
// para tando deve estar cadastrada no rootReducer.js do redux e assim receber ou enviar
// informação ao mesmo atraves de connect
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';

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

    handleAddProduct = id => {
         // implantado sem bindActionCreators do redux
         // dispatch usado para disparar uma action ao redux
         // const { dispatch } = this.props;
         // dispatch - action que informa ao redux que sera feita uma alteração no estado da app, todos reducer
         // disparando a action ADD_TO_CART que sera ouvida pelo reducer cart
         // dispatch(CartActions.addToCart(product));

         // acessando action da props
         const { addToCartRequest } = this.props;
         addToCartRequest(id);
    };


    render() {
        const { products } = this.state;
        const { amount } = this.props; // acessando do props porque estamos usando classe em vez de funcao

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
                                onClick={() => this.handleAddProduct(product.id)}>
                            <div>
                                <MdAddShoppingCart size={ 16 } color="#FFF"/> {' '}
                                {amount[product.id] || 0 }
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

const mapStateToProps = state => ({
    // criando propriedade amount(objeto) pra listagem de produtos
    // e passando a qtd de produtos da propriedade amount de product
     amount: state.cart.reduce((amount, product) => {
         amount[product.id] = product.amount;
         return amount;
     }, {}),
});

// convertendo action em atributos da function
const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

// conectando ao state do redux
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Home);
