// essa funcao concetra os reducer da app

import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
    cart, // cadastrar os reducer aqui separados por virgula
})
