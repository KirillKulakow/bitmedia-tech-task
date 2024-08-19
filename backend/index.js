import express from 'express';
import mongoose from 'mongoose';
import impressionsRoute from './src/routes/impression.routes.js';
import clicksRoute from './src/routes/click.routes.js';
import predictionRoutes from "./src/routes/prediction.routes.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/impressions', impressionsRoute);
app.use('/api/clicks', clicksRoute);
app.use('/api/predictions', predictionRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
