import {setLoading, setProducts} from '../store/actionCreators';
import {TFilter} from '../types/TFilter'
import {TSignIn} from '../types/TSignIn'
import {TRegistration} from '../types/TRegistration'
import {setToken} from '../store/actionCreators'
import {setUser} from '../store/actionCreators'
import {store} from '../store/rootReducer'

export async function getProducts (dispatch: any, filter: TFilter, langCode: string) {
    try {
    dispatch(setLoading(true))
        const response = await fetch(`http://localhost:3500/api/v1/product/all?name=${filter?.name ?? ''}&lang=${langCode}`)
        const data = await response.json();
        dispatch(setProducts(data));
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        dispatch(setLoading(false))
    }
}

export async function getProductsByIds (ids: string[]) {
    try {
        const response = await fetch(`http://localhost:3500/api/v1/product/curent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ids)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
} 

export async function sendOrder (orderedData: any) {
    try {
        const response = await fetch('http://localhost:3500/message/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderedData),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function logIn (user: TSignIn, dispatch: any): Promise<any> {
    try {
        const response = await fetch('http://localhost:3500/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const token = await response.json();
        dispatch(setToken(token));
        return token;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function registration (user: TRegistration): Promise<any> {
    try {
        const response = await fetch('http://localhost:3500/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getUserByToken (dispatch: any): Promise<any> {
    try {
        const {token} = store.getState().main
        const response = await fetch('http://localhost:3500/auth/getDataUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(setUser(data))
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getFetchComents (id: string) {
    try {
        const response = await fetch(`http://localhost:3500/api/v1/product/coments/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

type dataComent = {
    productId: string,
    userComent: string,
}

export async function setFetchComent (dataComent: dataComent) {
    try {
        const token = store.getState().main.token;
        const response = await fetch(`http://localhost:3500/api/v1/product/coments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(dataComent),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function gptFetchHandler (qestions: string, lang: string) {
    try {
        const token = store.getState().main.token;
        const response = await fetch(`http://localhost:3500/gpt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                'lang': lang,
            },
            body: JSON.stringify({text: qestions}),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}