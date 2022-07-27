import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '../'
import './layout.scss';

const Layout = ({ children, modalHandler  }) => {
    return (
        <div className="layout">
            <Menu modalHandler={modalHandler}/>
            <main className="layout__container">
                {children}
                {/*   <Footer /> */}
            </main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.elementType
}

export default Layout;