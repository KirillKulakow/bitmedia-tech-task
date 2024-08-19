import React from 'react';
import './CategorySelector.scss';

const categories = ['Technology', 'Health', 'Finance', 'Education', 'Entertainment'];

function CategorySelector({ value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor="category">Ad Category:</label>
            <select
                id="category"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
}

export default CategorySelector;
