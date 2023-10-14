import React from 'react';
import CartTable from './CartTable';

const CartPage = () => {
    return (
        <div>
            <h1 className='text-lg font-semibold text-center mt-4 mb-6'>Your Cart</h1>

            <CartTable />
        </div>
    );
};

export default CartPage;