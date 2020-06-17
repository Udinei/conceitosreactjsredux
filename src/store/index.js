/** Este file configura os midleware do saga e redux com do reactotron em tempo de dev */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// monitorando com  saga e reactotron
const sagaMonitor =
process.env.NODE_ENV === 'development'
? console.tron.createSagaMonitor()
: null;

const sagaMiddleware = createSagaMiddleware({
    sagaMonitor,
});

// enhancer conecta reactotorn com o redux, no ambiente de dev
// compose agrega midlewares do reactotron com o  saga
const enhancer =
process.env.NODE_ENV === 'development'
                ? compose(
                    console.tron.createEnhancer(),
                    applyMiddleware(sagaMiddleware)
                )
                : applyMiddleware(sagaMiddleware);


const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
