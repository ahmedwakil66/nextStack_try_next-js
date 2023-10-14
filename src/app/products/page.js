import fetchProducts from '@/utils/fetchProducts';
import React from 'react';
import ProductCard from './ProductCard';

const ProductsPage = async ({ searchParams }) => {
    const category = searchParams.category;
    const products = await fetchProducts(category ? { category } : {}) || [];

    return (
        <div>
            <h2 className="mb-5">Available products</h2>
            <div className="flex flex-wrap gap-4 md:gap-8">
                {products.map(product => <ProductCard key={product._id} product={product} />)}
            </div>
        </div>
    );
};

export default ProductsPage;