import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Todo as TodoInterface } from '@todo/shared/interfaces';
import { Button } from 'antd';

import { store } from '../common';
import Todo from '../todo';
import Skeleton from './skeleton';
import styles from './Home.module.css';

export default observer(() => {
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    Promise.all([store.fetchTodoList(), store.fetchMembers()]).then(() => setLoading(false));
  }, []);

  const onCreateSave = (todo: TodoInterface) => {
    const isEmpty = !todo.title && !todo.content?.length && !todo.members?.length;

    if (!isEmpty) {
      store.createTodo(todo);
    }

    setCreating(false);
  };

  const onListDelete = ({ id }: TodoInterface) => {
    if (id) {
      store.removeTodo(id);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      {creating ? (
        <Todo
          className={styles.todo}
          allMembers={store.members}
          onCancel={() => setCreating(false)}
          onSave={onCreateSave}
          key="create"
          defaultEditing
        />
      ) : (
        <Button
          className={styles.create}
          onClick={() => setCreating(true)}
          type="primary"
          size="large"
        >
          Создать
        </Button>
      )}
      {store.todoList.map(todo => (
        <Todo
          className={styles.todo}
          key={todo.id}
          allMembers={store.members}
          onDelete={() => onListDelete(todo)}
          onSave={newTodo => store.updateTodo({ ...todo, ...newTodo })}
          {...todo}
        />
      ))}
    </>
  );
});
