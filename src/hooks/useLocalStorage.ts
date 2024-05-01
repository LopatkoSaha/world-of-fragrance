import {useState} from 'react'
import { UseLocalStorageFunction } from '../types/TLocalStorageProps';

export const useLocalStorage: UseLocalStorageFunction = (key, defaultValue) => {
        const [localState, setLocalState] = useState(() => {
            const data = localStorage.getItem(key)
            if (data) {
                return JSON.parse(data)
            }
            return defaultValue;
        });

        const localHeandler = (data: Record<string, any> | Array<any>) => {
            localStorage.setItem(key, JSON.stringify(data));
            setLocalState(data)
        }

    return [localState, localHeandler];
}