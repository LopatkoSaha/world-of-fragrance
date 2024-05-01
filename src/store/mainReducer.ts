import {TAction} from '../types/TAction'
import {EAction} from '../types/EAction'
import {TLanguage} from '../types/TLanguage'
import {defaultLang} from '../data/Language'
import {EMessage} from "../types/actions/EMassageActions"
import { EUser } from '../types/actions/EUserActions'
import {TUser} from '../types/TUser'

type TState = {
    theme: string,
    loading: boolean,
    language: TLanguage,
    isMessage: string,
    token: string,
    user: TUser,
}

const defaultState: TState = {
    theme: 'light',
    loading: false,
    language: defaultLang,
    isMessage: '',
    token: '',
    user: {
        userName: '',
        email: '',
        tel: '',
        role: '',
    }

};

export const mainReducer = (state: TState = defaultState, {type, payload}: TAction): TState => {
    switch (type) {
        case EAction.THEME:
            return {...state, theme: payload}
        case EAction.IS_LOADING:
            return {...state, loading: payload}
        case EAction.LANGUAGE:
            return {...state, language: payload}
        case EMessage.IS_MESSAGE:
            return {...state, isMessage: payload}
        case EMessage.IS_TOKEN:
            return {...state, token: payload}
        case EUser.IS_USER:
            return {...state, user: payload}

        default:
            return state;
    }
}