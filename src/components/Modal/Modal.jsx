import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = ({ modalHandler, resetList }) => {
    return (
        <div className='overlay'>
            <div className='Modal'>
                <div className='Modal__header'>
                    <h3>Empezar una nueva lista</h3>
                </div>
                <form className='Modal__body' onSubmit={resetList}>

                    <section className='Modal__body--paragraph'>
                        <p>
                            Cuando comenzás una nueva lista, tu lista existente se elimina.
                            ¿Estás seguro que querés empezar una nueva lista?
                        </p>
                    </section>
                    <section className='Modal__buttonContainer'>
                        <button
                            className='button button__cancel'
                            onClick={() => modalHandler()}
                        >
                            Cancelar
                        </button>
                        <button
                            className='button button__ok'
                            type='submit'
                        >
                            Nueva lista
                        </button>
                    </section>
                </form>
            </div>

        </div>
    )
}

Modal.propTypes = {
    modalHandler: PropTypes.func,
    resetList: PropTypes.func
}

export default Modal