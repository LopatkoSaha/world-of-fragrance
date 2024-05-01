import { EAction } from "./EAction"
import { EBasketAction } from "./actions/EBasketAction"
import { EProductsAction } from "./actions/EProductsAction"
import { EMessage } from "./actions/EMassageActions"
import { EUser } from "./actions/EUserActions"

export type TAction = {
    type: EAction | EBasketAction | EProductsAction | EMessage | EUser,
    payload: any,
    checked?: boolean
}