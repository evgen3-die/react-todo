import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Todo as TodoInterface } from '@todo/shared/interfaces';
import { Button } from 'antd';

import { store } from '../common';
import Todo from '../todo';
import Skeleton from './skeleton';
import styles from './Home.module.css';

function remove({ id }: TodoInterface) {
  if (id) {
    store.removeTodo(id);
  }
}

export default observer(() => {
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(true);

  useEffect(() => {
    store.init().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <Button
        className={styles.create}
        type="primary"
        size="large"
        onClick={() => setCreating(true)}
      >
        Создать
      </Button>
      {store.todoList.map(todo => (
        <Todo
          className={styles.todo}
          key={todo.id}
          onClickDelete={() => remove(todo)}
          allMembers={store.members}
          {...todo}
        />
      ))}
    </>
  );
});
