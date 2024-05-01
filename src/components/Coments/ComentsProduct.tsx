import style from './coments.module.css';
import {useState, useEffect} from "react";
import {getFetchComents} from '../../fetchs/fetchs';
import {Modal} from '../Modal/Modal';
import {AddComents} from './AddComents'
import {TProduct} from '../../types/TProduct';
import moment from '../../moment/ua';
import {useTypedSelector} from '../../hooks/useTypedSelector';


type TProductComents = {
    product: TProduct
}

export const ComentsProduct: React.FC<TProductComents> = ({product}) => {
    const [coments, setComents] = useState([]);
    const [showAddComent, setShowAddComent] = useState(false);
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const {langCode} = useTypedSelector(store => store.main.language);

    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getFetchComents(product._id);
            setComents(response);
        };
        fetchData();
    }, []);

    return (
        <>
            {!coments.length 
                ? 
                <>
                    <div className={style.noComents}>No coments</div>
                    <button onClick={()=>setShowAddComent(true)}>Create coment</button>
                </>
                :
                    <div className={style.coments}>
                        <h3>Coments</h3>
                        <button onClick={()=>setShowAddComent(true)}>Create coment</button>
                        {coments.map((item: Record<string, string>)=>{
                            return (
                                <div className={style.coment} key={item._id}>
                                    <div className={style.userName}>{item.userName}</div>
                                    <div className={style.date}>{moment(item.dateCreate).locale(langCode).format('DD MMM YYYY')}</div>
                                    <div className={style.date}>{moment(item.dateCreate).locale(langCode).toNow()}</div>
                                    <div className={style.textComent}>{item.userComent}</div>
                                </div>
                            )
                        })}
                    </div>
                }
                {showAddComent && 
                    <Modal closeHandler={()=>setShowAddComent(false)}>
                        <AddComents product={product} closeHandler={setShowAddComent} setComents={setComents}/>
                    </Modal>
                }
        </>
    )
}