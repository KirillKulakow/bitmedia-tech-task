import React from 'react';
import './BannerSizeSelector.scss';

const bannerSizes = ['300x250', '728x90', '160x600', '468x60'];

function BannerSizeSelector({ value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor="bannerSize">Banner Size:</label>
            <select
                id="bannerSize"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select a size</option>
                {bannerSizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                ))}
            </select>
        </div>
    );
}

export default BannerSizeSelector;
