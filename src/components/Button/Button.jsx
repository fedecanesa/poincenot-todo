import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = ({
    content,
    disabled,
    name,
    type,
}) => {
    return (
        <button
            disabled={disabled}
            name={name}
            type={type}
            className='button'
        >
            {content}
        </button>
    )
}

Button.propTypes = {
    content: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    type: PropTypes.string,
}

export default Button