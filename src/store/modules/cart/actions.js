/** Esse file funciona como um repositorio de funcoes que executam actions do redux,
 *  e podem ser chamadas como parametros em funções ex: Cart.
 *  */
export function addToCartRequest(id) {
    return {
        type: '@cart/ADD_REQUEST',
        id,
    };
}

// Acessado pelo saga
export function addToCartSucess(product) {
    return {
        type: '@cart/ADD_SUCCESS',
        product,
    };
}

export function removeFromCart(id){
    return {
        type: '@cart/REMOVE',
        id,
    };
}

export function updateAmount(id, amount){
    return {
        type: '@cart/UPDATE_AMOUNT',
        id,
        amount
    }
}
