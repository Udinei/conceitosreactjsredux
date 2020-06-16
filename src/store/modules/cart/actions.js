﻿// Esse file funciona como um repositorio de funcoes que executam actions do redux
export function addToCart(product) {
    return {
        type: '@cart/ADD',
        product,
    };
}

export function removeFromCart(id){
    return {
        type: '@cart/REMOVE',
        id,
    };
}
