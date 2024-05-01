import style from './applyForm.module.css'
import { useState, useMemo } from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import { useDispatch } from "react-redux";
import {deleteProduct, updateStateBasket} from '../../store/actionCreators';
import {getProductsByIds, sendOrder} from '../../fetchs/fetchs';
import {setMessage} from "../../store/actionCreators";


interface ApplyFormProps {
    handlerApply: (data: boolean) => void;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({handlerApply}) => {
    const [username, setUserName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setMail] = useState('');
    const [text, setText] = useState('');
    const {products} = useTypedSelector(store =>store.basket);
    const dispatch = useDispatch();
    
    const productsApply = useMemo(() => products.filter((el) => el.checked
    ).map(item =>{
        return {
            id: item._id,
            name: item.name,
            price: item.price,
            count: item.count,
        }
    }),[products])

    const handleReset = () => {
        productsApply.forEach((element) => {
            dispatch(deleteProduct(element.id))
        });
        setUserName('rrrrrr5');
        setTel('5555555');
        setMail('fffff@ffff');
        setText('ppppp');
        handlerApply(false);
    }
const updateBasket = (curentData: Array<Record<string, any>>) => {
    dispatch(updateStateBasket(curentData));
    handlerApply(false);
}
const actionUpdateBasket = (data: Array<Record<string, any>>) => {
    updateBasket(data);
    dispatch(setMessage('You must uppdate this page'));
}

const apply = async () =>{
    try {
        const orderedProducts = products.filter((item) => item.checked);
        const data = await getProductsByIds(orderedProducts.map((item) => item._id));
        const differens = orderedProducts.map((item: Record<string, any>) => {
            const curentProduct: Record<string, any> | undefined = data.find((elem: Record<string, any>) => elem.id === item.id);
            if (curentProduct?.price !== item.price){
                return false
            } 
            if (curentProduct?.presence < item.count) {
                return false
            }
            return true
        })
        if (differens.includes(false)) {
            actionUpdateBasket(data)
        } else {
            await sendOrder({productsApply, username, tel, email, text});
        }
        handleReset()
    }catch(error) {
        console.error(error);
    }
    

}
    return (
        <>
            <div className={style.container}>
                <div>
                    <label htmlFor='name'>
                    <div style={{fontSize: '0.9rem', color: 'red', marginRight: '5px'}}>*name</div>
                        <input
                            id='name'
                            required
                            placeholder="name" 
                            type="text" 
                            name="userName" 
                            tabIndex={1} 
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='tel'>
                        <div style={{fontSize: '0.9rem', color: 'red', marginRight: '5px'}}>*tel</div>
                        <input
                            id='tel'
                            required
                            placeholder="+38(__) ___ __ __" 
                            type="tel" 
                            name="tel" 
                            tabIndex={2} 
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='email' >
                        <div style={{fontSize: '0.9rem', marginRight: '5px'}}>email</div>
                        <input
                            id='email'
                            type="email" 
                            placeholder="npm@gmail.com" 
                            name="email" 
                            tabIndex={3} 
                            value={email}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <textarea
                        style={{fontSize: '0.9rem', marginRight: '5px'}}
                        name="text"
                        tabIndex={4}
                        placeholder="Entered your massage"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                />
                </div>
                <div>
                    <button  onClick={apply}>Submit</button>
                    <button  onClick={()=>handleReset}>Reset</button>
                </div>
            </div>
        </>
    );
};