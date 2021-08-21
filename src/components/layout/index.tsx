import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

const Layout: FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  //const token = localStorage.getItem("token")
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTYyODk2OTI3NX0.1hTTcqiscp_xAv18xqiY-_VEC7gCJGygVHXtzDTEFuY';

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const tokenUser = await axios.post(`${process.env.REACT_APP_API_LINK}/checktoken`, token);
    setUser(tokenUser);
    console.log('use', tokenUser);
  }

  return (
    <div className="layout">
      <header className="header_container">
        <a className="logo" href="/">
          Patrone
        </a>
      </header>
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
