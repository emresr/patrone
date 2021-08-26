import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const Login = () => {
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

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function Submit() {
    if (!email || !password) {
      setErrorMessage('Email or password should be provided!');
      return;
    } else {
      const data = await loginService(email, password);
      data && console.log(data);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 4000);
  }, [errorMessage]);

  return (
    <div className="login_container">
      <form>
        <input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </form>
      <button onClick={Submit}>Login</button>
      {errorMessage && <h1>{errorMessage}</h1>}
    </div>
  );
};

export default Login;
