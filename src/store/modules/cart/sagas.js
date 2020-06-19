/** Essa function intercept action do redux, adiciona novos dados aos objetos
 * e retorna para o fluxo padrao do state do redux
 */
import { call, select, put, all, takeLatest } from 'redux-saga/effects'; // permite chamar metodos asyncronos que retornam promisses do javascritp
import { toast } from 'react-toastify';
import api from '../../../services/api';


// history - permite navegar entre paginas
import history from '../../../services/history';

import { formatPrice } from '../../../util/format';
import { addToCartSucess, updateAmountSuccess } from './actions';


// esse metodo adiciona altera o obj produto adicionando outras informações
// antes de adiconar o produto ao carrinho
// generator expande as funcionalidade do javascript
function* addToCart({ id }) {
    const productExists = yield select(
        state => state.cart.find(p => p.id === id)
    );

    // obtem produto do estoque com id do produto passado
    const stock = yield call(api.get, `/stock/${id}`);

    // stockAmount - quanto tem desse produto no estoque
    const stockAmount = stock.data.amount;

    // obtem qtd de produto no carrinho, caso tenha, senao retorna zero
    const currentAmount = productExists ? productExists.amount : 0;

    // amount - total de produto no carinho mais 1 solicitado
    const amount = currentAmount + 1;

    // qtd solicitada é maior do que estoque
    if (amount > stockAmount) {
        toast.error('Quantidade solicitada não contem no estoque')
        return; //
    }

    // se existe no state
    if (productExists) {
        yield put(updateAmountSuccess(id, amount));

    } else {
        // yield aguarda a execução do codigo é semelhante ao await
        // intercepta a url antes de ser enviada ao reducer
        const response = yield call(api.get, `/products/${id}`)

        // altera o objeto data(produto) do state redux adicionando novos atributos:
        // amount e priceformatado
        const data = {
            ...response.data,
            amount: 1,
            priceFormatted: formatPrice(response.data.price),
        }

        // retornando o controle para o reducer adicionar produto ao carrinho
        // disparando action,
        yield put(addToCartSucess(data));
        // navegando para o carrinho via saga
        history.push('/cart');


    }
}

function* updateAmount({ id, amount }) {

    // deve haver ao meno um produto no carrinho
    if (amount <= 0) return;

    //    const product = yield select(state => state.cart.find(p => p.id === id));

    const stock = yield call(api.get, `stock/${id}`);
    const stockAmount = stock.data.amount;

    // se qtd solicitada nao haver no estoque
    if (amount > stockAmount) {
        toast.error('Quantidade solicitada não contem no estoque')
        return; //
    }

    // reenviando action para reducer atualizar
    yield put(updateAmountSuccess(id, amount));

}


// cadastrando listners que ficam ouvinda a chamda da funcao addToCart
export default all([
    // takeLatest  controle de clicks rapidos antes de terminar a chamada a api
    // para o mesmo componente e assume somente o ultimo click como valido, ,
    takeLatest('@cart/ADD_REQUEST', addToCart),
    takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),


])


