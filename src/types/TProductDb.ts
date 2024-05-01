export type TProductDb = {
    ua: {
        name: string,
        discription: string,
    },
    en: {
        name: string,
        discription: string,
    },
    _id?: string,
    img: string,
    price: number,
    pictures: Array<string>,
    oldPrice: number,
    presence: number,
}