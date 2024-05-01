import {ProductCard} from '../ProductCard/ProductCard'
import style from './productList.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {TLocalStorageProps} from '../../types/TLocalStorageProps'
import {TProduct} from '../../types/TProduct'
import React from 'react'

export const ProductList: React.FC<TLocalStorageProps> = ({favorites, setFavorites}) => {
    const {filteredProducts} = useTypedSelector(store =>store.products)

    return (
        <div className={style.wrapper}>
            {filteredProducts.map((element: TProduct) => (
                <React.Fragment key={element._id}>
                    <ProductCard
                        product={element} 
                        favorites = {favorites}
                        setFavorites = {setFavorites}
                    />
                </React.Fragment>
            ))}
        </div>
        
    )
}