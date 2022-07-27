import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { logo } from '../../utils/images';
import { routesEnum } from '../../constants/routesEnum';
import { logout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './menu.scss';

const Menu = ({ modalHandler }) => {

    const dispatch = useDispatch();
    const cerrarSesion = () => {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('todos');
        dispatch(logout());
    }


    return (
        <div className="menu">
            <Link className="menu__logo" to={routesEnum.HOME}>
                <img src={logo} alt="Poincenot" />
            </Link>

            <div className="menu__login">
                <button
                    type='button'
                    className="menu__login-resert"
                    onClick={modalHandler}
                >
                    Reset
                </button>
                <Link
                    className="menu__login-text"
                    exact
                    to={routesEnum.LOGIN}
                    onClick={cerrarSesion}
                >
                    Cerrar Sesión
                </Link>
            </div>
        </div >
    )
}

Menu.propTypes = {
    cerrarSesion: PropTypes.func,
}

export default Menu;