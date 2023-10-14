'use client';

import useCart from "@/hooks/useCart";
import Link from "next/link";
import toast from "react-hot-toast";

const CartTable = () => {
    const { cart, isLoading, totalPrice, mutate, isValidating } = useCart();

    if (isLoading) return <span className="loading loading-bars loading-lg block mx-auto"></span>

    return (
        <div className="overflow-x-auto">
            {
                isValidating && <div className="flex justify-center items-center fixed w-[100vw] h-[100vh] top-0 left-0 z-10" style={{ background: 'rgba(0, 0, 0, .5)' }}>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th className="w-20">Price ($)</th>
                        <th className="w-14">Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        cart.map(({ _id, title, quantity, price }, ind) => <tr key={_id}>
                            <th>{ind + 1}</th>
                            <td className="text-blue-400"><Link href={`/products/${_id}`}>{title}</Link></td>
                            <td className="text-end">{price}</td>
                            <td className="text-end">{quantity}</td>
                            <td>
                                <TableActions
                                    quantity={quantity}
                                    productId={_id}
                                    mutate={mutate}
                                />
                            </td>
                        </tr>)
                    }
                    <tr className="text-lg">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total:</td>
                        <td className="text-yellow-500">${totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => toast('Feature not yet supported')} className="btn btn-primary btn-sm block my-4 mx-auto">Proceed to checkout</button>
        </div>
    );
};

const TableActions = ({ quantity, productId, mutate }) => {
    const handleAddToCart = async (type) => {
        let Q = quantity;
        try {
            if (type === '-') Q -= 1
            else if (type === '+') Q += 1
            else if (type === 'x') Q = 0;
            if (type === '-' && Q < 0) return;
            else if (type === '+' && Q > 9) return;

            await fetch(`/api/cart?productId=${productId}&quantity=${Q}`, {
                cache: 'no-store',
                method: 'POST'
            });
            mutate();
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex gap-2">
            <div className="flex">
                <button
                    onClick={() => handleAddToCart('-')}
                    disabled={quantity === 1}
                    className="btn btn-sm btn-primary"
                >
                    -
                </button>
                <input type="text" className="w-9 block px-3 font-bold" value={quantity} disabled />
                <button
                    onClick={() => handleAddToCart('+')}
                    disabled={quantity === 9}
                    className="btn btn-sm btn-primary"
                >
                    +
                </button>
            </div>

            <button onClick={() => handleAddToCart('x')} className="btn btn-sm btn-error">x</button>
        </div>
    )
}

export default CartTable;