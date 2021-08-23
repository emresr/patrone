import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { User } from '../../types';
import { stampToDate } from '../../utils/time';
const Layout: FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  const token = localStorage.getItem('token');

  async function getUser() {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/me`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      })
      .then((response) => {
        setUser(response.data);
        console.log('user', user);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="layout">
      <header className="header_container">
        <a className="logo" href="/">
          Patrone
        </a>
        {user && (
          <div>
            <h1>{user.name}</h1>
          </div>
        )}
      </header>

      <main className="layout_container">
        <div className="main_container"> {children}</div>
        <div className="trending_container">
          {user && (
            <div>
              <h1>{user.name}</h1>
              <h1>{stampToDate(user.until)}</h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
