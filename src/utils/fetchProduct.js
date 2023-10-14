import { getProductFromDb } from '@/services/products.services';
import { cache } from 'react';
import 'server-only';

const fetchProduct = cache(getProductFromDb)

export default fetchProduct;