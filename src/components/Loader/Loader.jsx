import React from 'react'
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";
import './loader.scss';

const Loader = ({ loading }) => {
    return (
        <div className="loader">
            <ClipLoader loading={loading} size={150} />
        </div>
    )
}

Loader.propTypes = {
    loading: PropTypes.bool,
}

export default Loader;