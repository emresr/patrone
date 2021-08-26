import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Layout from './layout';

import Post from './post';
import Main from './main';
import Tag from './tag';
import New from './new';
import NotFound from './ui/NotFound';

const App: FC<{}> = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/new" component={New} />

          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/tag/:name" component={Tag} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
