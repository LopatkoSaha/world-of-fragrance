import style from './coments.module.css';
import {useState, useEffect} from "react";
import {setFetchComent, getFetchComents} from '../../fetchs/fetchs';
import {TProduct} from '../../types/TProduct';
import {useDispatch} from 'react-redux';
import {setMessage} from '../../store/actionCreators';
import moment from 'moment';

type TProductComents = {
    product: TProduct,
    closeHandler: React.Dispatch<React.SetStateAction<boolean>>,
    setComents: React.Dispatch<React.SetStateAction<never[]>>,
}

export const AddComents: React.FC<TProductComents> = ({product, closeHandler, setComents}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

    const setDataComents = async () => {
        const response = await setFetchComent({productId: product._id, userComent: value});
        const getFetchResponse = await getFetchComents(product._id);
        setComents(getFetchResponse);
        closeHandler(false);
        dispatch(setMessage(response));
    }
    
    return(
        <div className={style.textArea}>
            <h2>Enter your coment</h2>
            <textarea 
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={setDataComents}>Send coment</button>
        </div>
    )
}