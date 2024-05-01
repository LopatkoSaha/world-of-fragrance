import style from './signIn.module.css'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registration} from '../../fetchs/fetchs'
import {logIn} from '../../fetchs/fetchs'
import {getUserByToken} from '../../fetchs/fetchs'
import {useTypedSelector} from '../../hooks/useTypedSelector'

type TRegistr = {
    setRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Registration: React.FC<TRegistr> = ({setRegistration}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [tel, setTel] = useState('');
    const [email, setMail] = useState('');
    const clearForm = () => {
        setUserName('');
        setPassword('');
        setTel('');
        setMail('');
    }
    const {token} = useTypedSelector(store =>store.main);

    return (
        <>
            <div className={style.container}>
                <div className={style.header}>REGISTRATION</div>
                <div>
                    <label htmlFor='login'>
                    <div style={{fontSize: '0.9rem', color: 'red', marginRight: '5px'}}>*login</div>
                        <input
                            id='login'
                            // required
                            placeholder="login" 
                            type="text" 
                            name="login" 
                            tabIndex={1} 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='password'>
                        <div style={{fontSize: '0.9rem', color: 'red', marginRight: '5px'}}>*password</div>
                        <input
                            id='password'
                            // required
                            placeholder="password"
                            type="password" 
                            name="password" 
                            tabIndex={2} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='tel'>
                        <div style={{fontSize: '0.9rem', color: 'red', marginRight: '5px'}}>*tel</div>
                        <input
                            id='tel'
                            required
                            placeholder="+38(__) ___ __ __" 
                            type="tel" 
                            name="tel" 
                            tabIndex={2} 
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='email' >
                        <div style={{fontSize: '0.9rem', marginRight: '5px'}}>email</div>
                        <input
                            id='email'
                            type="email" 
                            placeholder="npm@gmail.com" 
                            name="email" 
                            tabIndex={3} 
                            value={email}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </label>
                </div>
                <button onClick={async() => {
                    await registration({userName, password, tel, email});
                    await logIn({userName, password}, dispatch);
                    getUserByToken(dispatch);
                    clearForm();
                    setRegistration(false);
                }}
                >
                    Registration
                </button>
                <button onClick={() => setRegistration(false)}>Cansel</button>
            </div>
        </>
    )
}