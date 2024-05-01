import style from './layout.module.css'
import {Link, Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Loader } from '../Loader/Loader'
import {Search} from '../../components/Search/Search'
import { Basket } from '../../components/Basket/Basket'
import {Theme} from '../../components/Theme/Theme'
import {Favorites} from '../../components/Favorites/Favorites'
import {Language} from '../../data/Language'
import {getProducts} from '../../fetchs/fetchs'
import { TFilter } from '../../types/TFilter'
import {TLocalStorageProps} from '../../types/TLocalStorageProps'
import {useLocalStorage} from '../../hooks/useLocalStorage'
import {Message} from '../../components/Message/Message'
import {SignIn} from '../SignIn/SignIn'

export const Layout: React.FC<TLocalStorageProps> = ({favorites, setFavorites}) => {
    const [filter, setFilter] = useState<TFilter>(null);
    const filtrHeandler = (curentFilter: TFilter)=>setFilter(curentFilter);
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(false);
    const {theme, loading, language, isMessage} = useTypedSelector(store =>store.main);
    useEffect(()=>{
        getProducts(dispatch, filter, language.langCode)
    },[filter, language, dispatch]);

    return (
        <div className={style.layout}>
            <header className={style[theme]}>
                <div className={style.navbar}>
                    <Search filtrHeandler={filtrHeandler} closeHeandler={setShowSearch} showSearch={showSearch} setShowSearch={setShowSearch}/>
                    <div className={style.menu}>
                        <Link className={style.home} to='/'>Home</Link>
                        <Link className={style.admin} to='admin'>Admin</Link>
                        <Link className={style.gpt} to='GPT'>GPT Helper</Link>
                        <Basket/>
                        <Favorites favorites={favorites} setFavorites={setFavorites}/>
                    </div>
                    <SignIn/>
                    <div className={style.dropdown}>
                        <Theme useLocalStorage={useLocalStorage}/>
                        <Language/>
                    </div>
                </div>
            </header>
            <main className={style.main}>
                <Outlet/>
            </main>
            <footer 
                className={style.footer}
            >
                Footer 2023
            </footer>
            {loading && <Loader/>}
            {isMessage && <Message/>}
        </div>
    )
}