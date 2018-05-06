import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Select = ({options = [], disabled, onChange, placeholder, value}) => {
    if(!Array.isArray(options)) return null;
    return (
        <div className="custom-select">
            <select disabled={disabled} onChange={onChange}>
                <option value="" disabled selected={!value}>{placeholder}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.id} selected={opt.id === value}>{opt.name}</option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    options: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};
Select.defaultProps = {
    options: [],
    disabled: false,
    placeholder: '- Select -'
};

export default Select;
