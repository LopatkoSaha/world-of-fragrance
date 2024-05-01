import { useDispatch } from 'react-redux';
import {chengeTheme} from '../../store/actionCreators'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useEffect} from 'react'
import {LocalStorageProps} from '../../types/ILocalStorage'


export const Theme: React.FC<LocalStorageProps> = ({useLocalStorage}) => {
    const dispatch = useDispatch()
    const {light, dark} = useTypedSelector(store => store.main.language.theme)
    const [storageTheme, setStorageTheme] = useLocalStorage('theme', 'light')
    useEffect(() => {
        dispatch(chengeTheme(storageTheme))
    }, [dispatch, storageTheme])
    return (
        <select 
            onChange={(event) => {
                    dispatch(chengeTheme(event.target.value))
                    setStorageTheme([event.target.value])
                }
            }
        >
            <option selected={storageTheme === 'light'} value='light'>{light}</option>
            <option selected={storageTheme === 'dark'} value='dark'>{dark}</option>
        </select>
    )
}