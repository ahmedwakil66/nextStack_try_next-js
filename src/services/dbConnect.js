const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@craftawesome.bgwffom.mongodb.net/?retryWrites=true&w=majority`;

/**
 * @type {import("mongodb").Db}
 */
let db;
let categoryCollection;
let productCollection;

const dbConnect = async () => {
    if (db) return db;
    try {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        db = client.db('nextStack');
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return db;
    } catch (error) {
        console.log(error.message || 'db connection error');
    }
}

export const connectDatabase = async() => {
    const db = await dbConnect();
    if(!categoryCollection) categoryCollection = db.collection('categories');
    if(!productCollection) productCollection = db.collection('products');

    return {
        categoryCollection,
        productCollection
    }
}

export default dbConnect;
