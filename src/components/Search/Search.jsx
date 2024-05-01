import style from './search.module.css'
import { useState, useEffect, useMemo} from 'react'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useDispatch} from 'react-redux'
import {setFilteredProducts} from '../../store/actionCreators'

export const Search = ({filtrHeandler, closeHeandler, showSearch, setShowSearch})=>{
    const dispatch = useDispatch();
    const {allProducts} = useTypedSelector(store =>store.products);
    const minLimit = useMemo(() => Math.min(...allProducts.map(item => item.price)), [allProducts]); 
    const maxLimit = useMemo(() => Math.max(...allProducts.map(item => item.price)), [allProducts]);
    const [name, setName] = useState('');
    const [minPrice, setMinPrise] = useState(0);
    const [maxPrice, setMaxPrise] = useState(0);

    useEffect(()=>{
        setMinPrise(minLimit);
        setMaxPrise(maxLimit);
    },[allProducts, minLimit, maxLimit]);

    useEffect(()=>{
        dispatch(setFilteredProducts(allProducts.filter(item => item.price >= minPrice && item.price <= maxPrice)))
    },[allProducts, dispatch, minPrice, maxPrice])

    return (
        <>
            {!showSearch 
            ? <div className={style.searchTitle} onClick={()=>setShowSearch(true)}>Search</div>
            :<div className={style.search}>
                <div className={style.name} onClick={()=>closeHeandler(false)}>Search:</div>
                <input className={style.searchWord} type="Search" value={name} onChange={(e)=>setName(e.target.value)}></input>
                <div className={style.serchPrice}>
                    <input
                        style={{
                            width: '5vw',
                        }}
                        type='number'
                        disabled={true}
                        value={minPrice}
                        onChange={(e)=>{setMinPrise(e.target.value)}}
                    />
                    <div className={style.rangeMin}>
                        <input 
                            type="range" 
                            value={minPrice}
                            step={10} 
                            min={minLimit}
                            max={maxLimit}
                            onChange={(e)=>{
                                setMinPrise(+e.target.value)
                                if (+e.target.value > maxPrice) { 
                                    setMaxPrise(+e.target.value)
                                }}
                            }
                        ></input>
                    </div>
                    <div className={style.rangeMax}>
                        <input 
                            type="range"
                            value={maxPrice}
                            step={10}
                            min={minLimit}
                            max={maxLimit}
                            onChange={(e)=>{
                                setMaxPrise(+e.target.value)
                                if (+e.target.value < minPrice) { 
                                    setMinPrise(+e.target.value)
                                }}
                            }
                        ></input>
                    </div>
                    <input
                        style={{
                            width: '5vw',
                        }}
                        type='number'
                        disabled={true}
                        value={maxPrice}
                        onChange={(e)=>{setMaxPrise(e.target.value)}}
                    />
                </div>
                <button onClick={()=>{
                    filtrHeandler(
                        {
                            name: name,
                        });
                    }}
                >
                    &#128269;
                </button>
            </div>
            }
        </>
    )
}