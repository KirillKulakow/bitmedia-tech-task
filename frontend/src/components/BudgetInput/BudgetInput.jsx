import React from 'react';
import './BudgetInput.scss';

function BudgetInput({ value, onChange }) {
    return (
        <div className="form-group budget-input">
            <label htmlFor="budget">Daily Budget:</label>
            <div className="input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                    type="number"
                    id="budget"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    min="10"
                    max="10000"
                    step="100"
                    placeholder="Enter budget (10-10000)"
                />
            </div>
        </div>
    );
}

export default BudgetInput;
