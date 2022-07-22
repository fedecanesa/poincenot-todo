import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserPending,
    getUserSuccess,
    getUserFail,
} from '../../features/user/userSlice';
import { registerService } from '../../services/register.service';
import { Button, Error, Input, Loader, Title } from '../../components';
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
        <div className='register'>
            <div className='register__titleContainer'>
                <Title>Registro</Title>
                <img src={logo} alt="Logo" />
            </div>
            {
                user &&
                <div className='register__userIdContainer'>
                    <p>Tu número de userId es <br /><b> {user}</b> <br /> y esta copiado en tu portapapeles</p>
                </div>
            }

            {
                isLoading
                    ? <Loader />
                    : <div className='register__formContainer'>
                        <form
                            onSubmit={generateUser}
                            className='register__form'
                        >
                            {
                                (error && user.length > 0) &&
                                <Error variant="danger">{error}</Error>
                            }
                            <Button
                                type="submit"
                                content="Genera un userId"
                                disabled={false}
                                name="register_submit"
                            />

                        </form>
                    </div >
            }
            <div className='register__toLogin'>
                <p>
                    ¿Ya tenes userId? <span>  </span>
                    <a href={routesEnum.LOGIN}>Ingresa aca</a>
                </p>
            </div>
        </div >
    )
}

Register.propTypes = {}

export default Register;