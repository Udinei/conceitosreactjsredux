// reducer - state - estado do objeto enviado a action do redux
//         - action - array com nome da action e seu conteudo
export default function cart(state = [], action) {
    console.log(state);

    // todos os reducer ouvem as action do redux, por isso o switch
    // implementado para ouvir somente o reducer especifico nesse caso cart
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.product];
        default:
            // retorna o estado atual, caso não seja o reducer ADD_TO_CART
            return state;
    }
}
