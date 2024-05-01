import style from './admin.module.css'
import{useState, useEffect} from 'react'

type TProps = {
    index: number,
    item: string,
    setPictures: (index: number, value: string) => void,
}

export const InputPicture = ({index, item, setPictures}: TProps) => {
    const [value, setValue] = useState(item);
    
    useEffect(()=>{
        setPictures(index, value)
    }, [value])

    return (
        <div className={style.picture}>
            {index + 1}:__
            <input 
                type="text"  
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className={style.img}>
                <img src={value}/>
            </div>
        </div>
    )
}