import {useState, useEffect} from "react";
import style from './ProductCard.module.css'
import {Modal} from '../Modal/Modal'
import {Slider} from '../Slaider/Slaider'
import {useDispatch} from 'react-redux';
import {addProduct, deleteProduct} from '../../store/actionCreators'
import {TProduct} from '../../types/TProduct'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {Link} from 'react-router-dom'
import {setProductForRoute} from '../../store/actionCreators'



type TProps = {
    product: TProduct,
    favorites: TProduct[],
    setFavorites: (data: TProduct[]) => void,
}

export function ProductCard ({product, setFavorites, favorites}: TProps) {
    const [showDetails, setShowDetails] = useState(false);
    const { price, buttonAdd, buttonRemote, sale, presence, noPresence, pieces, isOver} = useTypedSelector(store => store.main.language.productCard);
    const {products} = useTypedSelector(store => store.basket);
    const isInBasket = !!products.find(item => item._id === product._id);
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
            setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const favoritesHandler = (product: TProduct) => {
        if (favorites.find(item => item._id === product._id)) {
            setFavorites(favorites.filter(item => item._id !== product._id))
        } else {
            setFavorites([...favorites, product])
        }
    }

    return (
        <>
            <div className={style.product}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
            >
                <div className={style.iconFavorites} 
                        onClick={()=>favoritesHandler(product)}
                    >
                        {favorites.find(item => item._id === product._id) ? '\u{1F499}' : '\u{1F5A4}'}
                </div>
                <Link to={`/product${product._id}`} 
                    onClick={()=> dispatch(setProductForRoute(product))}
                >
                    {product.presence !== 0 && product.oldPrice !== product.price &&
                        <div className={style.sale}>
                            {sale} <br/> {Math.round((product.oldPrice - product.price)/product.oldPrice * 100) + '%'}
                        </div>
                    }
                    <h3>{product.name}</h3>
                    <div className={style.picture}
                        onClick={()=>setShowDetails(true)}
                    >
                        <img src={product.img}
                            alt={product.name} 
                        />
                    </div>
                </Link>
                {product.presence !== 0 && product.oldPrice !== product.price && 
                    <div className={style.oldPrice}>{product.oldPrice + price}</div>
                }
                {product.presence !== 0 && <div>{product.price + price}</div>}
                {product.presence <= 3 && product.presence !== 0 
                ?
                    <div className={style.isOver}>{isOver + ' ' + product.presence + ' ' + pieces}</div>
                :
                product.presence === 0 
                ? 
                    <div className={style.noPresence}>{noPresence}</div>
                : 
                    <div className={style.presence}>{presence + ' ' + product.presence + ' ' + pieces}</div>
                }
                {product.presence > 0 && 
                    <>
                        {isInBasket
                            ? <button style={{background: 'brown'}} onClick={()=>{dispatch(deleteProduct(product._id))}}>{buttonRemote}</button>
                            : <button onClick={()=>{dispatch(addProduct(product))}}>{buttonAdd}</button> 
                        }
                    </>
                }
                <>
                    {isHovered && 
                    <div className={style.discription}>
                        {product.discription}
                    </div>}
                </>
            </div>
            {showDetails && 
                <Modal closeHandler={()=>setShowDetails(false)}>
                    <h3>{product.name}</h3>
                    {product.pictures ? <Slider product={product.pictures}/> : <img src={product.img} alt={product.name}/>}
                    <div>{product.discription}</div>
                    <button onClick={()=>{
                            window.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance(product.discription);
                            window.speechSynthesis.speak(utterance);
                        }}>Speak</button>
                </Modal>
            }
        </>
            )         
}