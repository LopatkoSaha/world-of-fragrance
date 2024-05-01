import style from './loading.module.css'

export const Loader = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}