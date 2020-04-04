import React from 'react';
import { Todo as TodoInterface } from '@todo/shared/interfaces';

import Todo from '../todo';
import styles from './Home.module.css';

const todoList: TodoInterface[] = [
  {
    id: '0',
    title: 'Сделать задачи с описанием',
    timestamp: 1585984125,
    content: 'Описание',
    members: [
      {
        id: '0',
        name: 'Pavel'
      },
      {
        id: '1',
        name: 'Fedor'
      }
    ]
  },
  {
    id: '1',
    title: 'Сделать задачи с описанием',
    timestamp: 1585984125,
    content: [
      {
        id: '0',
        title: 'Пункт'
      },
      {
        id: '1',
        title: 'Еще пункт'
      }
    ],
    members: [
      {
        id: '0',
        name: 'Pavel'
      }
    ]
  }
];

export default () => {
  return (
    <>
      {todoList.map(todo => (
        <Todo
          className={styles.todo}
          key={todo.id}
          {...todo}
        />
      ))}
    </>
  );
};
