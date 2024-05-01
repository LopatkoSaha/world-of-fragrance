import style from './admin.module.css'
import{useState, useEffect} from 'react'

type TProps = {
    name: string,
    title: string,
    init: number,
    className: string,
    changeValue: (name: string, value: number) => void,
}

export const InputNumber = ({name, title, init, className, changeValue}: TProps) => {
    const [value, setValue] = useState(init);
    
    useEffect(()=>{
        changeValue(name, value)
    }, [value])

    return (
        <div className={className}>
            {title}:__
            <input 
                type="number"  
                value={value}
                onChange={(e) => setValue(+e.target.value)}
            />
        </div>
    )
}