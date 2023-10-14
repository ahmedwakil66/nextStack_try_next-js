import { ObjectId } from "mongodb";

const { connectDatabase } = require("./dbConnect")

// get multiple products
export const getProductsFromDb = async (query) => {
    const { productCollection } = await connectDatabase();
    return await productCollection.find(query || {}).toArray();
}

// get single product
export const getProductFromDb = async (productId) => {
    const { productCollection } = await connectDatabase();
    return await productCollection.findOne({ _id: new ObjectId(productId) });
}

// get cart products
export const getCartProductsFromDb = async (productIds) => {
    const { productCollection } = await connectDatabase();
    return await productCollection.find(
        { _id: { $in: productIds.map(id => new ObjectId(id)) } }
    ).toArray();
}