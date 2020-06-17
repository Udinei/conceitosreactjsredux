// reducer chamado toda vez que uma action é disparada

import produce from 'immer'; // permite manipular o state do redux

// state - estado do objeto enviado a action do redux
//         - action - array com nome da action e seu conteudo
export default function cart(state = [], action) {
    console.log(state);

    // todos os reducer ouvem as action do redux, por isso o switch
    // implementado para ouvir somente o reducer especifico nesse caso cart
    // adicina um produto no carrinho
    switch (action.type) {
        case '@cart/ADD_SUCCESS':

           // produce funcao do immer, que permite alterar
           // o estado do state do redux, em draft contem uma copia desse estado - rascunho
           return produce(state, draft => {
               // verifica se o produto ja esta cadastrado, no array de produtos
               const productIndex = draft.findIndex(p => p.id === action.product.id);

               // produto ja existe no carrinho
               if(productIndex >= 0){
                   // soma 1 em amount
                   draft[productIndex].amount += 1;

               } else {
                   // adiciona o produto ao carrinho
                draft.push({
                    ...action.product,
                    amount: 1,
                });
               }
           });


           //return [...state, {
           //         ...action.product,
           //         amount: 1, // tudo que tinha em product + campo adicionado ao reducer
           // }];
        case '@cart/REMOVE':
            // cria e altera state rascunho draft e o retorna no conteudo do state original
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id)

                // produto foi encontrado
                if(productIndex >= 0){
                    // remove produto do state, e atualiza
                    draft.splice(productIndex, 1);
                }
            });
        case '@cart/UPDATE_AMOUNT':

            // amount nao foi alterado nao faz nada
            if (action.amount <= 0){
                return state;
            }

            //acessando state do redux
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id)

                // produto foi encontrado
                if(productIndex >= 0) {
                    draft[productIndex].amount = Number(action.amount);
                }
            })
        default:
            // retorna estado sem alteração, caso não seja a action  ADD_TO_CART
            return state;
    }
}
