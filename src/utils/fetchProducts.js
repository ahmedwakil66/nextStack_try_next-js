import { getProductsFromDb } from '@/services/products.services';
import { cache } from 'react';
import 'server-only';

const fetchProducts = cache(getProductsFromDb)

export default fetchProducts;