import style from './basket.module.css'
import { useDispatch } from "react-redux";
import {addProduct, deleteProduct, productDecrement, orderedProduct} from '../../store/actionCreators'
import { useTypedSelector } from '../../hooks/useTypedSelector'

export const BasketElement = () => {
    const dispatch = useDispatch();
    const {products} = useTypedSelector(store =>store.basket)
    const {deleteItem, emptyBasket} = useTypedSelector(store =>store.main.language.basket);
    

    if (!products.length) {
        return <div>{emptyBasket}</div>
    }
    return (
        <>
            {products.map((item)=>{
                return (
                    <>
                        <div key={item._id} className={style.product}>
                            <div className={style.checkedContainer}>
                                <input type="checkbox"
                                        checked={item.checked}
                                        onChange={(e)=>{dispatch(orderedProduct({id: item._id, checked: e.currentTarget.checked}))} 
                                        }
                                        
                                />
                                <div style={{fontSize:'1rem'}}>{item.name}</div>
                            </div>
                            <img src={item.img} alt={item.name}/>
                            <div style={{fontSize:'1rem'}}>{item.price + ' $'}</div>
                            <button 
                                onClick={()=>{
                                    if (item.count >= item.presence) {
                                        return
                                    }
                                    dispatch(addProduct(item))
                                }}
                            >
                                +
                            </button>
                            <input className={style.input} type="text" value={item.count}/>
                            <button onClick={()=>dispatch(productDecrement(item._id))}>-</button>
                            <button onClick={()=>dispatch(deleteProduct(item._id))}>{deleteItem}</button>
                        </div>
                    </>
                );
            })}
        </>
    );
}