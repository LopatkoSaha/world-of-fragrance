import { createStore, combineReducers, applyMiddleware } from 'redux';
import {productsReducer} from './productsReducer'
import {mainReducer} from './mainReducer'
import {basketReducer} from './basketReducer'
import {productsAdminReducer} from './productsAdminReduser'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    products: productsReducer,
    main: mainReducer,
    basket: basketReducer,
    productsAdmin: productsAdminReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export type RootState = ReturnType<typeof rootReducer>