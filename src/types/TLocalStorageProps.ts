import { TProduct } from "./TProduct";

export type TLocalStorageProps = {
    favorites: TProduct[],
    setFavorites: (data: TProduct[]) => void,
}

export type UseLocalStorageFunction = (key: string, defaultValue: any) => [any, (data: Record<string, any> | Array<any>) => void];