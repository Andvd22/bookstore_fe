import { CART } from "@/model/variable"

export type CartLocal = Record<number, number>

export const addCart = (userId: number, item: { book_id: number, quantity: number }) => {
    const key = `${CART}-${userId}`;
    const cartCurrent = JSON.parse(localStorage.getItem(key) || "{}") as CartLocal;
    cartCurrent[item.book_id] = item.quantity;
    localStorage.setItem(key, JSON.stringify(cartCurrent));
}

export const deleteCart = (userId: number, book_id: number) => {
    const key = `${CART}-${userId}`;
    const cartCurrent = JSON.parse(localStorage.getItem(key) || "{}") as CartLocal;
    const newCart = {} as CartLocal;
    Object.keys(cartCurrent).map(k => {
        if(Number(k) !== book_id) {
            newCart[Number(k)] = cartCurrent[Number(k)];
        }
    })
    localStorage.setItem(key, JSON.stringify(newCart));
}

export const listCart = (userId: number): CartLocal => {
    const key = `${CART}-${userId}`;
    const cartCurrent = JSON.parse(localStorage.getItem(key) || "{}") as CartLocal;
    return cartCurrent;
}