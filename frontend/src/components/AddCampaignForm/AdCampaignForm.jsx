import React, { useState } from 'react';
import BannerSizeSelector from '../BannerSizeSelector/BannerSizeSelector.jsx';
import CategorySelector from '../CategorySelector/CategorySelector.jsx';
import BudgetInput from '../BudgetInput/BudgetInput.jsx';
import PredictionResults from '../PredictionResults/PredictionResults.jsx';
import './AddCampainForm.scss';

function AdCampaignForm() {
    const [bannerSize, setBannerSize] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [predictions, setPredictions] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // logic for fetching predictions from the API would go here
        setPredictions({
            impressions: 10000,
            clicks: 500,
            uniqueUsers: 8000,
            recommendedBid: 0.5
        });
    };

    return (
        <div className="ad-campaign-form">
            <h1>Ad Campaign Planner</h1>
            <form onSubmit={handleSubmit}>
                <BannerSizeSelector value={bannerSize} onChange={setBannerSize} />
                <CategorySelector value={category} onChange={setCategory} />
                <BudgetInput value={budget} onChange={setBudget} />
                <button type="submit">Get Predictions</button>
            </form>
            {predictions && <PredictionResults predictions={predictions} />}
        </div>
    );
}

export default AdCampaignForm;
