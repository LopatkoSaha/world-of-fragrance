import {store} from '../store/rootReducer';
import {TProductDb} from '../types/TProductDb'
import {getProductsDb} from '../store/actionCreators';

export async function showProductsDb (dispatch: any) {
    try {
        const token = store.getState().main.token;
        const response = await fetch(`http://localhost:3500/admin/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(getProductsDb(data));
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function createProductInDb (product: TProductDb, dispatch: any) {
    try {
        const token = store.getState().main.token;
        const response = await fetch(`http://localhost:3500/admin/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(product)
        })
        await showProductsDb(dispatch);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function updateProductInDb (product: TProductDb, dispatch: any) {
    try {
        const token = store.getState().main.token;
        const response = await fetch(`http://localhost:3500/admin/product/:id?${product._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(product)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const message = await response.json();
        await showProductsDb(dispatch);
        return message;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function deleteProductInDb (product: TProductDb, dispatch: any) {
    try {
        const token = store.getState().main.token;
        const response = await fetch(`http://localhost:3500/admin/product/?id=${product._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
        })
        await showProductsDb(dispatch);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}