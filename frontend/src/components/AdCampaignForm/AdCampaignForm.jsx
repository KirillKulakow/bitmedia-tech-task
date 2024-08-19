import React, { useState } from 'react';
import axios from 'axios';
import { BannerSizeSelector, BudgetInput, CategorySelector, PredictionResults } from "../index.js";
import './AdCampaignForm.scss';

function AdCampaignForm() {
    const [bannerSize, setBannerSize] = useState('');
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [predictions, setPredictions] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/predictions`, {
                bannerSize,
                category,
                budget: parseFloat(budget)
            });
            setPredictions(response.data);
            setLoading(false)
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
            {loading ? <p>Loading...</p> : <PredictionResults predictions={predictions} />}
        </div>
    );
}

export default AdCampaignForm;
