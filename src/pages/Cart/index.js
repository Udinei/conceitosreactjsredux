import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import  * as CartActions from '../../store/modules/cart/actions';

import { MdRemoveCircleOutline,
         MdAddCircleOutline,
         MdDelete
         } from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromCart }) {
    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th />
                        <th>PRODUTO</th>
                        <th>QTD</th>
                        <th>SUBTOTAL</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { cart.map(product => (
                        <tr>
                            <td>
                                <img src={product.image}
                                    alt={product.title}
                                />
                            </td>
                            <td>
                                <strong>{ product.title}</strong>
                                <span>{ product.priceFormatted }</span>
                            </td>
                            <td>
                                <div>
                                    <button type="button" onClick={() => removeFromCart(product.id)} >
                                        <MdRemoveCircleOutline size={ 20 } color="#7159c1" />
                                    </button>
                                    <input type="number" readOnly value={ product.amount } />
                                    <button type="button">
                                        <MdAddCircleOutline size={ 20 } color="#7159c1" />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>R$258,80</strong>
                            </td>
                            <td>
                                <button type="button" onClick={() =>
                                        //dispatch({ type: 'REMOVE_FROM_CART', id: product.id }) - sen usar bindActionCreators
                                        removeFromCart(product.id)
                                } >
                                    <MdDelete size={ 20 } color="#7159c1" />
                                </button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </ProductTable>

            <footer>
                <button type="button">Finalizar pedido</button>

                <Total>
                    <span>TOTAL</span>
                    <strong>R$1920,28</strong>
                </Total>
            </footer>
        </Container>
    );
}

// disponibiliza objeto car do state do redux, para
// a funcao local, assim que a funcao for chamada
const mapStateToProps = state => ({
    cart: state.cart,
});

// bindActionCreators - convertendo actions de CartActions em atributos da function principal
const mapDispathToProps = dispatch => bindActionCreators(CartActions, dispatch);

// acessando via connect o reducer cart do state do redux
export default connect(
    mapStateToProps,
    mapDispathToProps

    )(Cart);
