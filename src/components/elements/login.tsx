import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const loginService = (email: string, password: string) => {
    return axios
      .post(`${process.env.REACT_APP_API_LINK}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          window.location.reload();
        }
        return response.data;
      })
      .catch((err) => setErrorMessage(err.response.data.message));
  };
  const signupService = (email: string, password: string, name?: string) => {
    return axios
      .post(`${process.env.REACT_APP_API_LINK}/auth/signup`, {
        email,
        password,
        name,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          window.location.reload();
        }
        return response.data;
      })
      .catch((err) => setErrorMessage(err.response.data.message));
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function Submit() {
    if (!email || !password) {
      setErrorMessage('Email or password should be provided!');
      return;
    } else {
      if (isLogin) {
        const data = await loginService(email, password);
      } else {
        const data = await signupService(email, password, name);
      }
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 4000);
  }, [errorMessage]);

  return (
    <div className="auth_container">
      <img src="wavey.jpg" width="150" height="400" />
      <div className="form_container">
        <div className="select_container">
          <button
            onClick={() => {
              setIsLogin(true);
            }}
            className={` auth_button ${isLogin && 'selected'}`}
          >
            LOGIN
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
            }}
            className={` auth_button ${!isLogin && 'selected'}`}
          >
            {' '}
            SIGNUP
          </button>
        </div>
        <h1 className="auth_title">Join Patrone place to learn anything but nothing.</h1>
        <form>
          <input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="auth_input"
          />
          <input
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="auth_input"
          />
          {!isLogin && (
            <input
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="auth_input"
            />
          )}
        </form>
        <button onClick={Submit} className="submit_button">
          {isLogin ? 'Login ' : ' Sign up'}
        </button>
        {errorMessage && <h1>{errorMessage}</h1>}
      </div>
    </div>
  );
};

export default Login;
