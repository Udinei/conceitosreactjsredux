/** Essa function intercept action do redux, adiciona novos dados aos objetos
 * e retorna para o fluxo padrao do state do redux
 */
import { call, put, all, takeLatest } from 'redux-saga/effects'; // permite chamar metodos asyncronos que retornam promisses do javascritp
import api from '../../../services/api';
import { addToCartSucess } from './actions';

// * generator expande as funcionalidade do javascript
function* addToCart({ id }){
    // yield aguarda a execução do codigo é semelhante ao await
    // intercept a url antes de ser enviada ao usuario
    const response = yield call(api.get, `/products/${id}`)

    // disparando action
    yield put(addToCartSucess(response.data));
}

// cadastrando listners que ficam ouvinda a chamda da funcao addToCart
export default all([
    // takeLatest  controle de clicks rapidos antes de terminar a chamada a api
    // para o mesmo componente e assume somente o ultimo click como valido, ,
    takeLatest('@cart/ADD_REQUEST', addToCart),


])


