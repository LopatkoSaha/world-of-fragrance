import {EAction} from './EAction';
import {TProductDb} from './TProductDb'

export type TActionDb = {
    type: EAction;
    payload: TProductDb[];
}