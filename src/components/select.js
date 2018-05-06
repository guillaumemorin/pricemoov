import React from 'react';
import PropTypes from 'prop-types';

const Select = ({options = [], disabled, onChange, placeholder}) => {
    if(!Array.isArray(options)) return null;
    return (
        <select disabled={disabled} onChange={onChange}>
            <option value="" disabled selected>{placeholder}</option>
            {options.map((opt, index) => (
                <option key={index} value={opt.id}>{opt.name}</option>
            ))}
        </select>
    );
};

Select.propTypes = {
    options: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};
Select.defaultProps = {
    options: [],
    disabled: false,
    placeholder: '- Select -'
};

export default Select;
