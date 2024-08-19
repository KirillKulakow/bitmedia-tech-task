import React from 'react';
import './PredictionResults.scss';

function PredictionResults({ predictions }) {
    if (!predictions) {
        return null;
    }

    return (
        <div className="prediction-results">
            <h2>Predictions:</h2>
            <div className="result-item">
                <span className="label">Impressions:</span>
                <span className="value">{predictions.impressions.toLocaleString()}</span>
            </div>
            <div className="result-item">
                <span className="label">Clicks:</span>
                <span className="value">{predictions.clicks.toLocaleString()}</span>
            </div>
            <div className="result-item">
                <span className="label">Unique Users:</span>
                <span className="value">{predictions.uniqueUsers.toLocaleString()}</span>
            </div>
            <div className="result-item">
                <span className="label">Recommended Bid:</span>
                <span className="value">${predictions.recommendedBid.toFixed(2)}</span>
            </div>
        </div>
    );
}

export default PredictionResults;
