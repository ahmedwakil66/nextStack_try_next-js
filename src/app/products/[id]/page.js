import fetchProduct from '@/utils/fetchProduct';
import Image from 'next/image';
import React from 'react';
import AddToCart from './AddToCart';

export const revalidate = 0;

const ProductPage = async({params}) => {
    const product = await fetchProduct(params.id) || {};
    const { _id, title, thumbnail, description, price} = product;

    return (
        <div>
            <h2 className='font-semibold my-1'>{title}</h2>
            <Image src={thumbnail} width={400} height={300} alt=''/>
            <p className='text-yellow-600 my-1'>Price: ${price}</p>
            <p className='text-sm mb-5'>{description}</p>
            <AddToCart productId={_id.toString()}/>
        </div>
    );
};

export default ProductPage;