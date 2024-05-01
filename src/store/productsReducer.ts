import {EProductsAction} from '../types/actions/EProductsAction'
import {TAction} from '../types/TAction'
import {TProduct} from '../types/TProduct'

type TState = {
    allProducts: TProduct[],
    filteredProducts: TProduct[],
    productForRoute: TProduct,
}

const defaultState: TState = {
    allProducts: [],
    filteredProducts: [],
    productForRoute: {
        _id: '',
        name: '',
        img: '',
        discription: '',
        price: 0,
        pictures: [''],
        oldPrice: 0,
        presence: 0,
    },
};

export const productsReducer = (state: TState = defaultState, {type, payload}: TAction): TState => {
    switch (type) {
        case EProductsAction.SET_PRODUCTS:
            return {
                ...state, 
                allProducts: payload
            }
        case EProductsAction.SET_FILTERED_PRODUCTS:
            return {
                ...state, 
                filteredProducts: payload
            }
        case EProductsAction.SET_PRODUCT_FROM_ROUTE:
            return {
                ...state,
                productForRoute: payload
            }
        default:
            return state;
    }
}