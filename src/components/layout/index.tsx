import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Post, User } from '../../types';
import { stampToDate } from '../../utils/time';
import Login from '../elements/login';
import Payment from '../elements/payment';
import Avatar from 'boring-avatars';

const Layout: FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  console.log('layout user', user);
  async function getUser() {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/me`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    getUser();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="layout">
      <header className="header_container">
        <a className="logo" href="/">
          Patrone
        </a>
        {!user ? (
          <div></div>
        ) : (
          user.id && (
            <div className="header_logged">
              <Avatar
                size={30}
                name="Maria Mitchell"
                variant="beam"
                colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
              />
              <h1 className="vertically-centered header_username">{user.name}</h1>
              <button
                className="header_button"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
              >
                Logout
              </button>{' '}
            </div>
          )
        )}
      </header>

      {loading ? (
        <div className="loading_container">
          <div className="loading"></div>
        </div>
      ) : !user ? (
        <Login />
      ) : !user.until || Date.now() > Date.parse(user.until) ? (
        <Payment />
      ) : (
        <main className="layout_container">
          <div className="main_container"> {children}</div>

          <div className="user_container">
            <div className="user">
              {user && (
                <div>
                  <div className="user_name_container">
                    <Avatar
                      size={45}
                      name="Maria Mitchell"
                      variant="beam"
                      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                    />
                    <h1 className="user_name">{user.name}</h1>
                  </div>
                  <h1 className="since">Member since {stampToDate(user.createdAt)}</h1>
                  <h1 className="since">Subscription lasts {stampToDate(user.until)}</h1>
                  <div className="read_later_container">
                    <h1 className="read_later_title">Read later</h1>
                    {user.saved.length > 0 &&
                      user.saved.map((post: Post, index: number) => (
                        <h1 key={post.id} className="read_later">
                          <span>{index + 1}.</span>
                          <a href={`/post/${post.id}`} className="read_later_link">
                            {post.title}
                          </a>
                        </h1>
                      ))}
                  </div>
                </div>
              )}
              <div className="footer">
                <h1>Patrone - 2021</h1>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Layout;
