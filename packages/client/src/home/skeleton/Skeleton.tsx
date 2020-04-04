import React from 'react';
import { Card, Skeleton } from 'antd';
import styles from './Skeleton.module.css';

export default () => {
  return (
    <>
      <div className={styles.buttonOuter}>
        <Skeleton.Button
          className={styles.button}
          size="large"
          active
        />
      </div>
      <Card
        loading
        title={<Skeleton.Input size="small" active />}
        actions={[
          <Skeleton.Button size="small" active />,
          <Skeleton.Button size="small" active />
        ]}
      />
    </>
  );
};
