import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import './App.css';

import Home from '../home';
import Form from '../form';

const { Content } = Layout;

export default () => {
  return (
    <Router>
      <Layout className="App">
        <Content>
          <Switch>
            <Route path={['/create', '/update/:id']}>
              <Form />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
};
