import React from 'react';
import { Layout } from '../../components';
import { Link } from 'react-router-dom';
import { notFound } from '../../utils/images';
import PropTypes from 'prop-types';
import './notfound.scss';

const NotFound = () => {
    return (

        <div className="error__container">
            <div className="error__box">
                <div className="error__message">
                    <div className="error__title">
                        <h1>
                            Opss... Pagina no encontrada!
                        </h1>
                    </div>
                    <div className="error__button">
                        <Link
                            to={{
                                pathname: '/'
                            }}>
                            Volver al inicio
                        </Link>
                    </div>
                </div>
                <div className="error__image">
                    <img src={notFound} alt="Página no encontrada" />
                </div>
            </div>
        </div>

    )
}

NotFound.propTypes = {}

export default NotFound;