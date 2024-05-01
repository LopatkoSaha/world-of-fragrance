import {TAction} from '../types/TAction'
import {EAction} from '../types/EAction'
import {TProduct} from '../types/TProduct'
import {TLanguage} from '../types/TLanguage'
import {EBasketAction} from '../types/actions/EBasketAction'
import {EProductsAction} from '../types/actions/EProductsAction'
import {TIsordered} from '../types/TApplyChecked'
import {EMessage} from '../types/actions/EMassageActions'
import {EUser} from '../types/actions/EUserActions'
import {TUser} from '../types/TUser'
import {TProductDb} from '../types/TProductDb'
import {TActionDb} from '../types/TActionDb'

// Basket actions
export const addProduct = (payload: TProduct): TAction => ({type: EBasketAction.ADD_PRODUCT, payload})
export const deleteProduct = (payload: string): TAction => ({type: EBasketAction.DELETE_PRODUCT, payload})
export const productDecrement = (payload: string): TAction => ({type: EBasketAction.DECREMENT_PRODUCT, payload})
export const orderedProduct = (payload: TIsordered): TAction => ({type: EBasketAction.IS_ORDERED, payload})
export const orderedProductAll = (payload: boolean): TAction => ({type: EBasketAction.IS_ORDERED_ALL, payload})
export const updateStateBasket = (payload: Array<Record<string, any>>): TAction => ({type: EBasketAction.UPDATE_STATE_BASKET, payload})
// Main actions
export const chengeTheme = (payload: string): TAction => ({type: EAction.THEME, payload})
export const setLoading = (payload: boolean): TAction => ({type: EAction.IS_LOADING, payload})
export const setLanguage = (payload: TLanguage): TAction => ({type: EAction.LANGUAGE, payload})
export const setMessage = (payload: string): TAction => ({type: EMessage.IS_MESSAGE, payload})
export const setToken = (payload: string): TAction => ({type: EMessage.IS_TOKEN, payload})
export const setUser = (payload: TUser): TAction => ({type: EUser.IS_USER, payload})
// Product actions
export const setProducts = (payload: TProduct[]): TAction => ({type: EProductsAction.SET_PRODUCTS, payload})
export const setFilteredProducts = (payload: TProduct[]): TAction => ({type: EProductsAction.SET_FILTERED_PRODUCTS, payload})
export const setProductForRoute = (payload: TProduct): TAction => ({type: EProductsAction.SET_PRODUCT_FROM_ROUTE, payload})
export const getProductsDb = (payload: TProductDb[]): TActionDb => ({type: EAction.GET_PRODUCTS_DB, payload})