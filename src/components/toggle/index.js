import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Toggle = ({onChange}) => (
    <label className="switch" onChange={onChange}>
        <input type="checkbox" />
        <span className="slider round"></span>
    </label>
);

Toggle.propTypes = {
    onChange: PropTypes.func
};

export default Toggle;
