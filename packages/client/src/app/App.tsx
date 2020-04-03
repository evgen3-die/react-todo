import React from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react';

import './App.css';
import { useStore } from '../common';

const { Content } = Layout;

export default observer(() => {
  const store = useStore();

  return (
    <Layout className="App">
      <Content>
        {store.message}
      </Content>
    </Layout>
  );
});
