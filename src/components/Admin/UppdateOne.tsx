import style from './admin.module.css';
import {Modal} from '../Modal/Modal';
import { FC } from 'react';
import {TProductDb} from '../../types/TProductDb';
import {useState, useEffect} from 'react';
import {InputPicture} from './InputPicture';
import {InputNumber} from './InputNumber';
import {InputString} from './InputString';
import {InputTextArea} from './InputTextArea';
import {updateProductInDb} from '../../fetchs/fetchsAdmin';
import {showProductsDb} from '../../fetchs/fetchsAdmin';
import {useDispatch} from 'react-redux';
import {setMessage} from '../../store/actionCreators'


type TPropsShowUppdate = {
    showUppdateHandler: React.Dispatch<React.SetStateAction<boolean>>;
    product: TProductDb;
}

export const UppdateOne: FC<TPropsShowUppdate> = ({showUppdateHandler, product}) => {
    const [data, setData] = useState({...product});
    const dispatch = useDispatch();

    const stateHandler = (name: string, value:number | string) => {
        setData({
            ...data,
            [name]: value,
        })
    }

    const stateLangHandler = (lang: 'en' | 'ua', name: 'name' | 'discription', value: string) => {
        setData({
            ...data,
            [lang]: {
                ...data[lang],
                [name]: value
            }
        })
    }

    const statePicturesHandler = (index: number, value: string) => {
        data.pictures[index] = value;
        setData({...data})
    }

    const addPicturesHandler = (e: any) => {
        data.pictures.push('')
        setData({...data})
    }

    return (
        <>
            <Modal closeHandler={()=>showUppdateHandler(false)}>
                <div className={style.productUpp} key={product._id}>
                    <div className={style.id}>
                        id:__{product._id}
                    </div>
                    <InputString lang='en' name='name' title='Name En' init={product.en.name} className={style.enName} changeValue={stateLangHandler}/>
                    <InputString lang='ua' name='name' title='Name Ua' init={product.ua.name} className={style.uaName} changeValue={stateLangHandler}/>
                    <InputTextArea lang='en' name='discription' title='Discription En' init={product.en.discription} className={style.enDiscription} changeValue={stateLangHandler}/>
                    <InputTextArea lang='ua' name='discription' title='Discription Ua' init={product.ua.discription} className={style.uaDiscription} changeValue={stateLangHandler}/>
                    <div className={style.pictures}>
                        {data.pictures.map((item, index)=> <InputPicture item={item} index={index} key={index} setPictures={statePicturesHandler}/>)}
                    </div>
                    <button onClick={addPicturesHandler}>Add picture</button>
                    <InputNumber name='price' title='Price' init={product.price} className={style.price} changeValue={stateHandler}/>
                    <InputNumber name='oldPrice' title='Old price' init={product.oldPrice} className={style.oldPrice} changeValue={stateHandler}/>
                    <InputNumber name='presence' title='Presence' init={product.presence} className={style.presence} changeValue={stateHandler}/>
                </div>
                <button 
                    className={style.btnUpp} 
                    onClick={()=>{
                        updateProductInDb(data, dispatch).then(message => dispatch(setMessage(message))) 
                        showUppdateHandler(false);
                    }}>Uppdate</button>
            </Modal>
        </>
    )
}