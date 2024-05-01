import style from './admin.module.css';
import {TProductDb} from '../../types/TProductDb';
import{useState} from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {UppdateOne} from './UppdateOne';
import {CreateOne} from './CreateOne';
import {deleteProductInDb} from '../../fetchs/fetchsAdmin';
import {showProductsDb} from '../../fetchs/fetchsAdmin';
import {useDispatch} from 'react-redux';
import {setMessage} from '../../store/actionCreators';


export  const AllProductsDb = () => {
    const {productsDb} = useTypedSelector(store => store.productsAdmin);
    const [showUppdate, setShowUppdate] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [product, setProuct] = useState(productsDb[0]);
    const dispatch = useDispatch();

    return (
        <>  
            {!productsDb.length 
            ? <div>Products loading</div> 
            : productsDb.map((item: TProductDb) => {
                return(
                    <>
                        <div key={item._id} className={style.product}>
                            <div>{item._id}</div>
                            <div>{item.en.name}</div>
                            <div>{item.en.discription}</div>
                            <div>{item.ua.name}</div>
                            <div>{item.ua.discription}</div>
                            <div className={style.picturesProducts}>
                                {item.pictures.map((elem)=>{
                                    return (
                                        <div key={elem} className={style.pictureProduct}>
                                            <img src={elem}></img>
                                        </div>
                                    )
                                })}
                            </div>
                            <div>{item.price}</div>
                            <div>{item.oldPrice}</div>
                            <div>{item.presence}</div>
                        </div>
                        <div className={style.btns}>
                            <button onClick={()=>{setShowUppdate(true); setProuct(item)}}>Uppdate one</button>
                            <button onClick={()=>{setShowCreate(true)}}>Create one</button>
                            <button onClick={async()=>{
                                deleteProductInDb(item, dispatch).then(message => dispatch(setMessage(message))); 
                            }}>Delete one</button>
                        </div>
                        <div className={style.line}></div>
                    </>
                )
            })}
            {showUppdate && <UppdateOne showUppdateHandler={setShowUppdate} product={product}/>}
            {showCreate && <CreateOne showCreateHandler={setShowCreate}/>}
        </>
    )
}