import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({product}) => {
    const {_id, title, description, thumbnail} = product;

    return (
        <Link href={`/products/${_id}`} className='w-44 border border-gray-700 rounded block'>
            <Image src={thumbnail} width={170} height={120} alt=''/>
            <h2 className='font-semibold my-1 px-1'>{title}</h2>
            <p className='text-sm px-1'>{description}</p>
        </Link>
    );
};

export default ProductCard;