import style from './slaider.module.css'
import { useState } from 'react';

export const Slider = ({product}) => {
    const [pictures, setPictures] = useState(product)

    const chengeLeft = ()=>{
        const pict = [...pictures];
        const item = pict.shift();
        pict.push(item);
        setPictures(pict)
    }
    const chengeRight = ()=>{
        const pict = [...pictures];
        const item = pict.pop();
        pict.unshift(item);
        setPictures(pict)
    }
    return (
        <div className={style.sliderContainer}>
            <button className={style.btn} onClick={chengeLeft}>&#60;</button>
            <div className={style.imgContainer}>
                <img src={pictures[0]} alt='No picture'/>
            </div>
            <button className={style.btn} onClick={chengeRight}>&#62;</button>
        </div>
    )
}