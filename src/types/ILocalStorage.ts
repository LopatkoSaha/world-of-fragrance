export interface LocalStorageProps {
    useLocalStorage: (key: string, defaultValue: any) => [any, (data: Record<string, any> | Array<any>) => void];
}