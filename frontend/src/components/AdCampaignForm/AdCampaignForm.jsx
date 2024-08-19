import React, { useState } from 'react';
import axios from 'axios';
import { BannerSizeSelector, BudgetInput, CategorySelector, PredictionResults } from "../index.js";

function AdCampaignForm() {
    const [bannerSize, setBannerSize] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [predictions, setPredictions] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:3000/api/predict', {
                bannerSize,
                category,
                budget: parseFloat(budget)
            });
            setPredictions(response.data);
        } catch (err) {
            setError('Failed to get predictions. Please try again.');
            console.error(err);
        }
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
            {error && <p className="error">{error}</p>}
            {predictions && <PredictionResults predictions={predictions} />}
        </div>
    );
}

export default AdCampaignForm;
