
import { PropsWithChildren } from 'react';
import style from './Modal.module.css';
import { FC } from 'react';

type TProps = PropsWithChildren<{
    closeHandler: () => void,
}>

export const Modal: FC<TProps> = ({closeHandler, children})=>{
    return (
    <div className={style.wrapper}>
        <div className={style.content}>
            <button className={style.closeButton} onClick={closeHandler}>x</button>
            {children}
        </div>
    </div>
    )
}
