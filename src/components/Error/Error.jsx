import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

const Error = ({ children }) => {
    return (
        <p className='error'>
            {children}
        </p>
    )
}

Error.propTypes = {
    children: PropTypes.string
}

export default Error