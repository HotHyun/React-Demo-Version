import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../state/auth-context';
import Input from '../input/input';

const Login = () => {
    /* const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(); */
    /* const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(); */
    const [formIsValid, setFormIsValid] = useState(false);

    const emailReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.value, isValid: action.value.includes('@') }; // dispatch가 호출하고 싶은 함수의 형태가 USER_INPUT의 type을 가질 때 function의 action(최신 값)의 정보를 가져옴
        }
        if (action.type === 'INPUT') {
            return { value: state.value, isValid: state.value.includes('@') }; // dispatch가 호출하고 싶은 함수의 형태가 INPUT의 type을 가질 때 function의 state(prevState)의 정보를 가져옴 -> blur 처리
        }
        return { value: '', isValid: false }; // 둘다 아닐 때는 기본 값을 반환
    };

    const [emailState, dispatch] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    }); // 초깃값과 dispatch, emailReducer

    const passwordReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return {
                value: action.value,
                isValid: action.value.trim().length > 6,
            }; // dispatch가 호출하고 싶은 함수의 형태가 USER_INPUT의 type을 가질 때 function의 action(최신 값)의 정보를 가져옴
        }
        if (action.type === 'INPUT') {
            return {
                value: state.value,
                isValid: state.value.trim().length > 6,
            }; // dispatch가 호출하고 싶은 함수의 형태가 INPUT의 type을 가질 때 function의 state(prevState)의 정보를 가져옴 -> blur 처리
        }
        return { value: '', isValid: false }; // 둘다 아닐 때는 기본 값을 반환
    };

    const [passwordState, p_dispatch] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    }); // 초깃값과 p_dispatch, passwordReducer 지정

    const Authctx = useContext(AuthContext);

    const emailChangeHandler = (event) => {
        dispatch({ type: 'USER_INPUT', value: event.target.value }); // event가 일어날 때 값 변환
    };

    const passwordChangeHandler = (event) => {
        p_dispatch({ type: 'USER_INPUT', value: event.target.value }); // event가 일어날 때 값 변환
    };

    const validateEmailHandler = () => {
        dispatch({ type: 'INPUT' }); // event가 일어날 때 값 변환
    };

    const validatePasswordHandler = () => {
        p_dispatch({ type: 'INPUT' }); // event가 일어날 때 값 변환
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            Authctx.onLogIn(emailState.value, passwordState.value);
        } else {
        }
    };

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form valadity!');
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 1000);
        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    isValid={emailIsValid}
                    label={'E-Mail'}
                    type={'email'}
                    id={'email'}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                ></Input>
                <Input
                    isValid={passwordIsValid}
                    label={'Password'}
                    type={'password'}
                    id={'password'}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                ></Input>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
