import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginFail, loginSuccess, loginPending } from '../../features/login/loginSlice';
import { login } from '../../features/user/userSlice';
import { getTodos } from '../../features/todos/todoSlice';
import { getAllTodosService } from '../../services/todos.service';
import { Button, Error, Input, Loader, Title } from '../../components';
import { routesEnum } from '../../constants/routesEnum';
import { logo } from '../../utils/images';
import PropTypes from 'prop-types';
import './login.scss';


const Login = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state?.login);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handlerInput = (e) => {
        const { target: { value } } = e;
        if (value?.length === 0) {
            dispatch(loginFail(""));
        }
        setUser(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginPending());
        try {
            const { data, status, statusText } = await getAllTodosService(user);
            console.log(data)
            if (status === 200) {
                dispatch(login(user))
                dispatch(loginSuccess());
                dispatch(getTodos(data));
                navigate("/inicio");
            } else {
                return dispatch(loginFail("El userID no es valido" || statusText));
            }
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    }

    return (
        <div className="login">
            <div className='login__titleContainer'>
                <Title>Login</Title>
                <img src={logo} alt="Logo" />
            </div>
            {
                isLoading
                    ? <Loader />
                    : <div className='login__formContainer'>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <Input
                                type="text"
                                value={user}
                                onChange={handlerInput}
                                placeholder="Ingresa tu userId..."
                                name="login_input"
                            />
                            {
                                (error && user.length > 0) &&
                                <Error variant="danger">{error}</Error>
                            }
                            {
                                user.length > 0 && (
                                    <Button
                                        type="submit"
                                        content="Login"
                                        disabled={false}
                                        name="login_submit"
                                    />
                                )
                            }
                        </form>
                    </div>
            }
            <div className='login__toRegister'>
                <p>
                    ¿No estas registrado? <span>  </span>
                    <a href={routesEnum.REGISTER}>Crea una cuenta aca</a>
                </p>
            </div>

        </div>
    )
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handlerInput: PropTypes.func.isRequired,
}

export default Login;