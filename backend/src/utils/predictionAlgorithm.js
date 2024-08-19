import Impression from '../models/impression.model.js';
import Click from '../models/click.model.js';

export async function generatePredictions(bannerSize, category, budget) {
    const impressionsCount = await Impression.countDocuments({ banner_size: bannerSize, category: category });
    const clicksCount = await Click.countDocuments();
    const uniqueUsersCount = await Impression.distinct('user_id', { banner_size: bannerSize, category: category }).countDocuments();

    const avgImpressions = impressionsCount / 30;
    const avgClicks = clicksCount / 30;
    const avgUniqueUsers = uniqueUsersCount / 30;

    const predictedImpressions = Math.floor(avgImpressions * (budget / 100)); // assuming $100 as base budget
    const predictedClicks = Math.floor(avgClicks * (budget / 100));
    const predictedUniqueUsers = Math.floor(avgUniqueUsers * (budget / 100));

    const avgBid = await Impression.aggregate([
        { $match: { banner_size: bannerSize, category: category } },
        { $group: { _id: null, avgBid: { $avg: "$bid" } } }
    ]);

    const recommendedBid = avgBid[0].avgBid;

    return {
        impressions: predictedImpressions,
        clicks: predictedClicks,
        uniqueUsers: predictedUniqueUsers,
        recommendedBid: recommendedBid
    };
}
