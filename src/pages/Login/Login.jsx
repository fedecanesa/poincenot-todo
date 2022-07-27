import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginFail, loginSuccess, loginPending } from '../../features/login/loginSlice';
import { login } from '../../features/user/userSlice';
import { successTodo } from '../../features/todos/todoSlice';
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
    const userRef = useRef()

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
            const { data, status } = await getAllTodosService(user);
            if (status === 200) {
                dispatch(login(user))
                dispatch(loginSuccess());
                dispatch(successTodo(data));
                window.localStorage.setItem('user', JSON.stringify(user));
                window.localStorage.setItem('todos', JSON.stringify(data));
                navigate("/inicio");
            } else {
                return dispatch(loginFail("El userID no es valido"));
            }
        } catch (error) {
            dispatch(loginFail("Inconvenientes en la autenticación. Por favor, intentelo nuevamente."));
        }
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    return (
        <main className="login">
            <section className='login__container'>

                <div className='login__titleContainer'>
                    <Title>Login</Title>
                    <img src={logo} alt="Logo" />
                </div>
                {
                    isLoading
                        ? <Loader />
                        :
                        <form onSubmit={handleSubmit}>

                            {/*  <label htmlFor='user'>UserId</label> */}
                            <input
                                type="text"
                                placeholder="Ingresa tu userId..."
                                name="login_input"
                                id="userId"
                                ref={userRef}
                                autoComplete="off"
                                onChange={handlerInput}
                                value={user}
                                required
                            />

                            {
                                (error && user.length > 0) &&
                                <Error>{error}</Error>
                            }
                            <button type="submit">Login</button>
                        </form>

                }

                <p>
                    ¿No estas registrado? <br />
                    <span className='login__footer'>
                        <a href={routesEnum.REGISTER}>Crear userID</a>
                    </span>
                </p>
            </section>
        </main>
    )
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handlerInput: PropTypes.func.isRequired,
}

export default Login;