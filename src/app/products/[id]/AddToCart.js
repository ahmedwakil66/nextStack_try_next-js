'use client';
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddToCart = ({ productId }) => {
    const [Q, setQ] = useState(1);
    const { mutate } = useCart();

    const handleSetQ = (type) => {
        setQ(prev => {
            if (prev === 1 && type === '-') return prev;
            else if (prev === 9 && type === '+') return prev;
            else if (type === '-') return prev - 1;
            else if (type === '+') return prev + 1;
        })
    }

    useEffect(() => {
        fetch(`/api/cart?raw=true`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                const addedQ = data.cart[productId];
                if (addedQ) setQ(addedQ);
            })
            .catch(er => toast.error(er.message))
    }, [productId])

    const handleAddToCart = async () => {
        try {
            await fetch(`/api/cart?productId=${productId}&quantity=${Q}`, {
                cache: 'no-store',
                method: 'POST'
            });
            mutate();
            toast.success('Added to cart')
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex gap-5">
            <div className="flex">
                <button onClick={() => handleSetQ('-')} className="btn btn-primary">-</button>
                <input type="text" className="w-11 block px-4 font-bold" value={Q} disabled />
                <button onClick={() => handleSetQ('+')} className="btn btn-primary">+</button>
            </div>
            <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
        </div>
    );
};

export default AddToCart;