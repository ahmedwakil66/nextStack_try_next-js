import { useMemo } from "react";
import useSWR from "swr";

const fetcher = async() => {
    const res = await fetch(`/api/cart`, {cache: 'no-store'});
    const data = await res.json();
    return data.cart;
}

const useCart = () => {
    const {data: cart = [], isLoading, error, isValidating, mutate} = useSWR(`/api/cart`, fetcher);

    const totalPrice = useMemo(() => cart.reduce((pre, current) => current.price * current.quantity + pre, 0), [cart]);
    const productCount = useMemo(() => cart.reduce((pre, current) => current.quantity + pre, 0), [cart]);

    return {
        cart,
        totalPrice,
        count: productCount,
        isLoading,
        error,
        isValidating,
        mutate,
    }
};

export default useCart;