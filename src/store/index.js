import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';

// enhancer conecta reactotorn com o redux, no ambiente de dev
const enhancer = process.env.NODE_ENV === 'development'
                ? console.tron.createEnhancer()
                : null;


const store = createStore(rootReducer, enhancer);

export default store;
