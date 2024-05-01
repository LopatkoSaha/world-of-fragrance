import style from './signIn.module.css';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal} from '../Modal/Modal';
import {logIn} from '../../fetchs/fetchs';
import {getUserByToken} from '../../fetchs/fetchs';
import {Registration} from './Registration';
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {setUser} from '../../store/actionCreators'

export const SignIn = () => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [isRegistration, setRegistration] = useState(false);
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const {user, token} = useTypedSelector(store => store.main);

const clearForm = () => {
    setUserName('');
    setPassword('');
}

    return (
        <>
            {!isSignIn && !isRegistration
            ? 
                user.userName 
                ? 
                    <div className={style.userName}>
                        {user.userName}
                        <button onClick={() => dispatch(setUser({
                                userName: '',
                                email: '',
                                tel: '',
                                role: '',
                                }))
                            }
                        >Exit</button>
                    </div>
                : 
                <div 
                    className={style.btnSignIn}
                    onClick={() => setIsSignIn(true)}
                >
                    Sign in
                </div>
            :
                <Modal
                    closeHandler={() => {
                        setIsSignIn(false);
                        setRegistration(false);
                    }}
                >
                    {isSignIn &&
                        <>
                            <div className={style.header}>SIGN IN</div>
                            <div className={style.container}>
                                <div>
                                    <label htmlFor='login'>
                                    <div style={{fontSize: '0.9rem', color: 'red', marginRight: '5px'}}>*login</div>
                                        <input
                                            id='login'
                                            required
                                            placeholder="login" 
                                            type="text" 
                                            name="userName" 
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
                                            required
                                            placeholder="password"
                                            type="password" 
                                            name="password" 
                                            tabIndex={2} 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className={style.btnSigReg}>
                                <button onClick={async () => {
                                        await logIn({userName, password}, dispatch);
                                        getUserByToken(dispatch); 
                                        clearForm(); 
                                        setIsSignIn(false)
                                    }}
                                >
                                    Sign In
                                </button>
                                <button onClick={() => {setRegistration(true); setIsSignIn(false)}}>Registration</button>
                            </div>
                        </>
                    }
                    {isRegistration &&
                        <Registration setRegistration = {setRegistration}/>
                    }
                </Modal>
            }
        </>
    )
}