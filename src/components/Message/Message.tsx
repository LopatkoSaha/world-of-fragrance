import style from './message.module.css'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {setMessage} from '../../store/actionCreators'

export const Message = () => {
    const dispatch = useDispatch();
    const {isMessage} = useTypedSelector(store =>store.main);
    return (
        <>
            <div className={style.container}>
                <div className={style.massage}>
                    {isMessage}
                <button 
                    className={style.btn}
                    onClick={() => dispatch(setMessage(''))}
                >
                    Ok
                </button>
                </div>
                
            </div>
        </>
    )
}