import mongoose from "mongoose";

const ImpressionSchema = new mongoose.Schema({
    impression_id: String,
    timestamp: Date,
    banner_size: String,
    category: String,
    user_id: String,
    bid: Number,
});

const Impression = mongoose.model('Impression', ImpressionSchema);

export default Impression;
