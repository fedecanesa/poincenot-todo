import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserPending,
    getUserSuccess,
    getUserFail,
} from '../../features/user/userSlice';
import { registerService } from '../../services/register.service';
import { Error, Loader, Title } from '../../components';
import { routesEnum } from '../../constants/routesEnum';
import { logo } from '../../utils/images';
import PropTypes from 'prop-types';
import './register.scss';

const Register = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state?.user);
    const [user, setUser] = useState('');

    const generateUser = async (e) => {
        e.preventDefault();
        dispatch(getUserPending());
        try {
            const { data, status } = await registerService();
            if (status === 200 && data) {
                setUser(data)
                dispatch(getUserSuccess());
                navigator.clipboard.writeText(data);
            } else {
                return dispatch(getUserFail("Intente nuevamente."));
            }
        } catch (error) {
            dispatch(getUserFail(error.message));
        }
    }

    return (
        <main className='register'>
            <section className='register__container'>

                <div className='register__titleContainer'>
                    <Title>Registro</Title>
                    <img src={logo} alt="Logo" />
                </div>
                {
                    isLoading
                        ? <Loader />
                        :
                        <form
                            onSubmit={generateUser}
                            className='register__form'
                        >
                            {
                                user &&
                                <p className='register__userIdContainer'>
                                    <span>Tu número de userId es <br /><b> {user}</b> <br /> y esta copiado en tu portapapeles</span>
                                </p>
                            }

                            {
                                (error && user.length > 0) &&
                                <Error>{error}</Error>
                            }
                            <button type="submit">Generar userID</button>
                        </form>
                }

                <p>
                    ¿Ya tenes userId?  <br />
                    <span className='register__footer'>
                        <a href={routesEnum.LOGIN}>Ingresa aca</a>
                    </span>
                </p>

            </section>
        </main >
    )
}

Register.propTypes = {
    generateUser: PropTypes.func.isRequired
}

export default Register;