import {EAction} from '../types/EAction';
import {TProductDb} from '../types/TProductDb';
import {TActionDb} from '../types/TActionDb';

type TState = {
    productsDb: TProductDb[]
}

const defaultState: TState = {
    productsDb: []
}

export const productsAdminReducer = (state: TState = defaultState, {type, payload}: TActionDb): TState => {
    switch (type) {
        case EAction.GET_PRODUCTS_DB:
            return {
                ...state,
                productsDb: payload,
            }
        default:
            return state;
    }
}