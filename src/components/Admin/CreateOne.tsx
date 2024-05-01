import style from './admin.module.css'
import {Modal} from '../Modal/Modal'
import { FC } from 'react';
import {useState} from 'react';
import {InputPicture} from './InputPicture';
import {InputNumber} from './InputNumber';
import {InputString} from './InputString';
import {InputTextArea} from './InputTextArea';
import {showProductsDb} from '../../fetchs/fetchsAdmin';
import {createProductInDb} from '../../fetchs/fetchsAdmin';
import {useDispatch} from 'react-redux';
import {setMessage} from '../../store/actionCreators';


type TPropsShowUppdate = {
    showCreateHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateOne: FC<TPropsShowUppdate> = ({showCreateHandler}) => {
const dispatch = useDispatch();
const defaultProduct =  {
    ua: {
        name: '',
        discription: '',
    },
    en: {
        name: '',
        discription: '',
    },
    img: '',
    price: 0,
    pictures: [''],
    oldPrice: 0,
    presence: 0,
}

    const [data, setData] = useState(defaultProduct);

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

    const addPicturesHandler = () => {
        data.pictures.push('')
        setData({...data})
    }

    return (
        <>
            <Modal closeHandler={()=>showCreateHandler(false)}>
                <div className={style.productUpp} key={data.en.name}>
                    <InputString lang='en' name='name' title='Name En' init={data.en.name} className={style.enName} changeValue={stateLangHandler}/>
                    <InputString lang='ua' name='name' title='Name Ua' init={data.ua.name} className={style.uaName} changeValue={stateLangHandler}/>
                    <InputTextArea lang='en' name='discription' title='Discription En' init={data.en.discription} className={style.enDiscription} changeValue={stateLangHandler}/>
                    <InputTextArea lang='ua' name='discription' title='Discription Ua' init={data.ua.discription} className={style.uaDiscription} changeValue={stateLangHandler}/>
                    <div className={style.pictures}>
                        {data.pictures.map((item, index)=> <InputPicture item={item} index={index} key={index} setPictures={statePicturesHandler}/>)}
                    </div>
                    <button onClick={addPicturesHandler}>Add picture</button>
                    <InputNumber name='price' title='Price' init={data.price} className={style.price} changeValue={stateHandler}/>
                    <InputNumber name='oldPrice' title='Old price' init={data.oldPrice} className={style.oldPrice} changeValue={stateHandler}/>
                    <InputNumber name='presence' title='Presence' init={data.presence} className={style.presence} changeValue={stateHandler}/>
                </div>
                <button 
                    className={style.btnUpp}
                    onClick={()=>{
                        createProductInDb(data, dispatch).then(message => dispatch(setMessage(message))); 
                        showCreateHandler(false);
                    }}
                >Create</button>
            </Modal>
        </>
    )
}