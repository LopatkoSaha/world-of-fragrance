import { useDispatch } from 'react-redux';
import {TLanguage} from '../types/TLanguage'
import {setLoading, setLanguage} from '../store/actionCreators'

const LANGUAGES: TLanguage[] = [
    {
        langCode: "en",
        basket: {
            title: "Awesome basket",
            deleteItem: "Delete",
            emptyBasket: "Basket is blank",
            costProdukts: 'Cost produkts',
        },
        productCard: {
            price: '$',
            buttonAdd: 'Add',
            buttonRemote: 'Delete',
            sale: 'Sale',
            presence: 'Presence',
            noPresence: 'No presence',
            pieces: 'pieces',
            isOver: 'Is overed',
        },
        theme: {
            light: 'light theme',
            dark: 'dark theme',
        },
    },
    {
        langCode: 'ua',
        basket: {
            title: "Кошик",
            deleteItem: "Видалити",
            emptyBasket: "Кошик порожнiй",
            costProdukts: 'Разом'
        },
        productCard: {
            price: "\u20B4",
            buttonAdd: 'Додати',
            buttonRemote: 'Видалити',
            sale: 'Знижка',
            presence: 'В наявностi',
            noPresence: 'Не в наявностi',
            pieces: 'шт',
            isOver: 'Закiнчується'
        },
        theme: {
            light: 'Свiтла тема',
            dark: 'Темна тема',
        },
    },
];

export const defaultLang = LANGUAGES[0]
export function getLangByCode(code: string): Promise<TLanguage> {
    return new Promise ((res, rej)=>{
        setTimeout(()=>{
            const language = LANGUAGES.find((item) => item.langCode === code);
            if (!language) {
                rej('errLanguage')
            }else{
                res(language)
            }
        },1000)
    })
}

export function getLangCodes() {
    return LANGUAGES.map((item) => item.langCode);
}

export const Language = () => {
    const dispatch = useDispatch()
    return (
        <select onChange={(event) => {
            dispatch(setLoading(true))
                getLangByCode(event.target.value)
                .then((data) =>dispatch(setLanguage(data)))
                .catch((err)=>console.log(err))
                .finally(()=>dispatch(setLoading(false)))
        }}>
            {getLangCodes().map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
    )
}
