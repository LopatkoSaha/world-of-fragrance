import {EBasketAction} from '../types/actions/EBasketAction'
import {TAction} from '../types/TAction'
import {TProduct} from '../types/TProduct'

type TState = {
    products: Array<TProduct & {count: number, checked: boolean}>,
}

const defaultState: TState = {
    products: [],

};

export const basketReducer = (state: TState = defaultState, {type, payload, checked}: TAction): TState => {
    switch (type) {
        case EBasketAction.ADD_PRODUCT:
            const existAddProduct = state.products.find(item => item._id === payload.id);
            if (existAddProduct) {
                existAddProduct.count = existAddProduct.count + 1;
                return {
                    ...state,
                    products: [...state.products]
                }
            }
            return {
                ...state,
                products: [...state.products, {...payload, count: 1, checked: false}]
            }
        case EBasketAction.IS_ORDERED:
            return {
                ...state,
                products: state.products.map((item) => {
                    return item._id === payload.id 
                        ? 
                            {...item, checked: payload.checked}
                        : 
                            item
                })
            }
        case EBasketAction.IS_ORDERED_ALL:
            return {
                ...state,
                products: state.products.map((item) => {
                    return {...item, checked: payload}
                })
            }
        case EBasketAction.DELETE_PRODUCT:
            return {
                ...state, 
                products: state.products.filter(item => item._id !== payload)
            }
            case EBasketAction.UPDATE_STATE_BASKET:
            return {
                ...state, 
                products: payload.filter((item: TProduct) => {
                    return item.presence > 0})
                .map((elem: TProduct) => {
                    return {...elem, count: 1}
                })
            }
        case EBasketAction.DECREMENT_PRODUCT:
            const existDecrementProduct = state.products.find(item => item._id === payload);
            if (!existDecrementProduct) {
                return state
            }
            existDecrementProduct.count = existDecrementProduct.count - 1;
            if (!existDecrementProduct.count) {
                return {
                    ...state, 
                    products: state.products.filter(item => item._id !== payload)
                }
            }
            return {
                ...state, 
                products: [...state.products]
            }
            default:
                return state;
    }
}