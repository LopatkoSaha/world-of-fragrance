import style from './admin.module.css'
import{useState, useEffect} from 'react'

type TProps = {
    lang: 'en' | 'ua',
    name: 'name' | 'discription',
    title: string,
    init: string,
    className: string,
    changeValue: (lang: 'en' | 'ua', name: 'name' | 'discription', value: string) => void,
}

export const InputString = ({lang, name, title, init, className, changeValue}: TProps) => {
    const [value, setValue] = useState(init);
    
    useEffect(()=>{
        changeValue(lang, name, value)
    }, [lang, name, value])

    return (
        <div className={className}>
            {title}:__
            <input 
                type="text"  
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}