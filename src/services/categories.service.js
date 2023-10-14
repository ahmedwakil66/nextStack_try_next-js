const { connectDatabase } = require("./dbConnect")

export const getCategoriesFromDb = async() => {
    const {categoryCollection} = await  connectDatabase();
    return await categoryCollection.find({}).toArray();
}