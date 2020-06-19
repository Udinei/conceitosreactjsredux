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

// Para explorar melhor o saga, para cada action
// nomear duas funçoes de sufixo: Request(usada pelo saga) e Success (usada pedo reducer)
export function updateAmountRequest(id, amount){
    return {
        type: '@cart/UPDATE_AMOUNT_REQUEST',
        id,
        amount
    }
}

// funcao usada pelo reducer para alterar qtd e produto no carrinho
export function updateAmountSuccess(id, amount){
    return {
        type: '@cart/UPDATE_AMOUNT_SUCCESS',
        id,
        amount
    }
}
