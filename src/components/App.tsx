import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { Routes } from '../../types';

import Layout from './layout';

import Post from './post';
import Main from './main';
import Tag from './tag';
import New from './new';

import Login from './login';

interface Props {
  path: Routes;
}
const App: FC<{}> = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/new" component={New} />

          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/tag/:name" component={Tag} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
