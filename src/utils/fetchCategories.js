const { getCategoriesFromDb } = require("@/services/categories.service")
import { cache } from 'react';
import 'server-only';

const fetchCategories = cache(() => {
    return getCategoriesFromDb()
})

export default fetchCategories;