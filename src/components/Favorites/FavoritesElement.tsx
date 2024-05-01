import style from './favorites.module.css'
import {useDispatch} from 'react-redux'
import {addProduct} from '../../store/actionCreators'
import {TProduct} from '../../types/TProduct'
import {TLocalStorageProps} from '../../types/TLocalStorageProps'

export const FavoritesElement: React.FC<TLocalStorageProps> = ({favorites, setFavorites}) => {
    const dispatch = useDispatch();

    if (!favorites.length) {
        return <div>Your likes is blank</div>
    }
    return (
        <>
            {favorites.map((item: TProduct)=>{
                return (
                    <>
                        <div key={item._id} className={style.favoritesCard}>
                            <div className={style.favoritesName}>{item.name}</div>
                            <img className={style.favoritesImg} src={item.img} alt={item.name}/>
                            <div className={style.favoritesPrice}>{item.price + ' $'}
                        </div>
                            <button 
                                onClick={()=>{
                                    dispatch(addProduct(item))
                                    setFavorites(favorites.filter((elem: TProduct)=>elem._id !== item._id))
                                }}
                            >
                                Add to basket
                            </button>
                        </div>
                    </>
                );
            })}
        </>
    );
}