import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import styles from './App.module.css';
import Home from '../home';

const { Header, Content } = Layout;

export default () => {
  return (
    <Router>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          TODO
        </Header>
        <Content className={styles.content}>
          <Switch>
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
