import mongoose from 'mongoose';

const ClickSchema = new mongoose.Schema({
    click_id: String,
    timestamp: Date,
    impression_id: String,
    user_id: String,
});

const Click = mongoose.model('Click', ClickSchema);

export default Click;
