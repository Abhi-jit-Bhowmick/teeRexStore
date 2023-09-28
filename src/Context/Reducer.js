
export const reducerFunc = (state, action) => {
    switch (action.type) {
        case "addToCart": {
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, qty: 1 }]
            }
        }
        case "increment": {
            return {
                ...state, cart: state.cart.filter(prod =>
                    prod.id === action.payload.id && prod.quantity > prod.qty ?
                        prod.qty += 1 : prod.qty
                )
            }

        } case "decrement": {
            return {
                ...state,
                cart: state.cart.filter(p => {
                    if (p.id === action.payload.id && p.qty > 0) {
                        return p.qty -= 1
                    } else {
                        return p.qty
                    }
                })
            }
        }
        case "delete": {
            return {
                ...state,
                cart: state.cart.filter(p =>
                    p.id !== action.payload.id
                )
            }
        }
        default: {
            return state
        }
    }
}