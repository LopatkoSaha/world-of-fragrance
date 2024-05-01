import style from './basket.module.css'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../Modal/Modal';
import { BasketElement } from './BasketElement';
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {ApplyForm} from './ApplyForm'
import { orderedProductAll } from '../../store/actionCreators';


export const Basket = () => {
    const [stateBasket, setStateBasket] = useState(false);
    const {products} = useTypedSelector(store =>store.basket);
    const {costProdukts} = useTypedSelector(store =>store.main.language.basket);
    const {price} = useTypedSelector(store =>store.main.language.productCard);
    const [apply, setApply] = useState(false);
    const dispatch =useDispatch();

    const summProducts = products.reduce((acc, item)=>{
        return acc+item.count
    },0)
    const summPrice = products.reduce((acc, item)=>{
        return item.count > 0 ? acc + item.count * item.price : acc
    },0)

    return(
        <>
        {stateBasket ? (
            !apply 
            ?(
                <>
                    <Modal closeHandler={()=>setStateBasket(false)}>
                        <div className={style.modal}>
                            {summPrice !== 0 && <div style={{fontSize: '1.5rem'}}>{costProdukts + ' ' + summPrice + ' ' + price}</div>}
                            {products.length>1 && <input type="checkbox" 
                                onChange={(e)=>{
                                        dispatch(orderedProductAll(e.currentTarget.checked))
                                    } 
                                }
                            />}
                            <BasketElement/>
                        </div>
                        {products.length > 0 &&
                            <button 
                                disabled={!products.filter((item) => item.checked).length} 
                                className={style.btnBuy} 
                                onClick={()=>{setApply(true)}}
                            >
                                Apply now
                            </button>
                        }
                    </Modal>
                </>
            ): 
                <Modal closeHandler={()=>setStateBasket(false)}>
                    <div className={style.modal}>
                        {summPrice !== 0 && <div style={{fontSize: '1.5rem'}}>{costProdukts + ' ' + summPrice + ' ' + price}</div>}
                        <ApplyForm handlerApply={setApply}/>
                    </div>
                    <button className={style.btnBuy} onClick={()=>{setApply(false)}}>Back to basket</button>
                </Modal>
        
        ):(
        <div className={style.busketIcon}>
            <div
                className={style.img}
                onClick={()=>setStateBasket(true)}
            >&#128722;</div>
            {summProducts ? 
                    <div className={style.busketCount}>
                        {summProducts > 9 ? '9+' : summProducts}
                    </div> 
                : 
                    ''
            }
        </div>
        )}
        </>
    )
}