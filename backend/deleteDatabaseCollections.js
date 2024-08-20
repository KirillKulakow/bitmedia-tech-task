import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 45000,
});

async function deleteCollections() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();

        const collectionsToDelete = ['impressions', 'clicks'];

        for (const collectionName of collectionsToDelete) {
            const collection = db.collection(collectionName);
            await collection.drop();
            console.log(`Collection '${collectionName}' has been deleted.`);
        }

        console.log('All specified collections have been deleted.');
    } catch (error) {
        if (error.message === 'ns not found') {
            console.log('One or more collections were not found.');
        } else {
            console.error('Error deleting collections:', error);
        }
    } finally {
        await client.close();
    }
}

deleteCollections().catch(console.error);
