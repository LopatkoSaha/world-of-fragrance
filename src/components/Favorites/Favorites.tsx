import style from './favorites.module.css'
import {useState} from 'react'
import {FavoritesElement} from '../Favorites/FavoritesElement'
import {Modal} from '../Modal/Modal'
import {TLocalStorageProps} from '../../types/TLocalStorageProps'

const blackHard = '\u{1F5A4}';
const blueHard =  '\u{1F499}';

export const Favorites: React.FC<TLocalStorageProps> = ({favorites, setFavorites}) => {
    const [stateFavorites, setStateFavorites] = useState(false)
    
    return (
        stateFavorites ? 
            <>
                <Modal
                    closeHandler={()=>setStateFavorites(false)}
                >
                        <div className={style.modal}>
                            <FavoritesElement favorites={favorites} setFavorites={setFavorites}/>
                        </div>
                </Modal>
            </>
        :
        favorites.length ?
            <div className={style.favorites} onClick={()=>setStateFavorites(true)}>
                <div className={style.favoritesIcon}>
                    {blueHard}
                </div>
                <div className={style.favoritesCount}>
                    {favorites.length > 9 ? '9+' : favorites.length}
                </div>
            </div>
        :
            <div className={style.favoritesIcon}>
                {blackHard}
            </div>
        
    )
}
