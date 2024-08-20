import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 45000,
});

const bannerSizes = ['300x250', '728x90', '160x600', '468x60'];
const categories = ['Technology', 'Health', 'Finance', 'Education', 'Entertainment'];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function generateData() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const impressionsCollection = db.collection('impressions');
        const clicksCollection = db.collection('clicks');

        const impressionsLimit = 2000000;
        const clicksLimit = 600000;
        const impressionsSizeLimit = 200 * 1024 * 1024; // 200 MB in bytes
        const batchSize = 10000;

        let impressionsCount = 0;
        let clicksCount = 0;
        let impressionsSize = 0;

        while (impressionsCount < impressionsLimit && impressionsSize < impressionsSizeLimit) {
            const impressionsBatch = [];
            for (let i = 0; i < batchSize && impressionsCount < impressionsLimit && impressionsSize < impressionsSizeLimit; i++) {
                const impression = {
                    impression_id: `imp_${impressionsCount}`,
                    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
                    banner_size: getRandomElement(bannerSizes),
                    category: getRandomElement(categories),
                    user_id: `user_${Math.floor(Math.random() * 100000)}`,
                    bid: parseFloat((Math.random() * 9.9 + 0.1).toFixed(2))
                };
                impressionsBatch.push(impression);
                impressionsSize += JSON.stringify(impression).length;
                impressionsCount++;
            }
            await impressionsCollection.insertMany(impressionsBatch);
            console.log(`Generated ${impressionsCount} impressions (${(impressionsSize / (1024 * 1024)).toFixed(2)} MB)`);
        }

        while (clicksCount < clicksLimit) {
            const clicksBatch = [];
            for (let i = 0; i < batchSize && clicksCount < clicksLimit; i++) {
                clicksBatch.push({
                    click_id: `click_${clicksCount}`,
                    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
                    impression_id: `imp_${Math.floor(Math.random() * impressionsCount)}`,
                    user_id: `user_${Math.floor(Math.random() * 100000)}`
                });
                clicksCount++;
            }
            await clicksCollection.insertMany(clicksBatch);
            console.log(`Generated ${clicksCount} clicks`);
        }

        console.log(`Data generation complete. Generated ${impressionsCount} impressions (${(impressionsSize / (1024 * 1024)).toFixed(2)} MB) and ${clicksCount} clicks.`);
    } catch (error) {
        console.error('Error generating data:', error);
    } finally {
        await client.close();
    }
}

generateData().catch(console.error);
