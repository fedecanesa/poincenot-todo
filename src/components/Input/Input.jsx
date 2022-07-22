import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = ({
    type,
    value,
    onChange,
    name,
    placeholder
}) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            value={value}
            name={name}
            className='input'
            onChange={onChange}
        />
    )
}

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
}

export default Input;