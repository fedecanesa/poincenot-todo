import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';

const Title = ({ children }) => {
    return (
        <h1 className="title">
            {children}
        </h1>
    )
}

Title.propTypes = {
    children: PropTypes.string
};
export default Title;
