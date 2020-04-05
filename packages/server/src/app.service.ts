import { Injectable } from '@nestjs/common';
import { Todo } from '@todo/shared/interfaces';

const getTimestamp = () => Math.round(+new Date() / 1000);
const generateId = ((id = 0) => () => `${id++}`)();
const generateMembers = () => ['Павел', 'Федор', 'Михаил'];

const generateTodoList = (members: string[]): Todo[] => [
  {
    id: generateId(),
    title: 'Executing async code on update of state with react-hooks',
    timestamp: getTimestamp(),
    content: `
      useState setter doesn't provide a callback after state update is done like
      setState does in React class components.
      In order to replicate the same behaviour,
      you can make use of the a similar pattern like componentDidUpdate lifecycle
      method in React class components with useEffect using Hooks.
    `,
    members: [...members]
  },
  {
    id: generateId(),
    title: 'Купить продукты',
    timestamp: getTimestamp(),
    content: [
      {
        title: 'Составить список',
        checked: true
      },
      {
        title: 'Котлеты',
        checked: false
      },
      {
        title: 'Молоко',
        checked: false
      },
      {
        title: 'Хлеб',
        checked: false
      },
      {
        title: 'Пельмени',
        checked: false
      }
    ],
    members: [members[0]]
  }
];

@Injectable()
export class AppService {
  private members = generateMembers();
  private todoList = generateTodoList(this.members);

  getTodoList() {
    return this.todoList;
  }

  createTodo({ ...todo }: Todo) {
    this.todoList.unshift({
      ...todo,
      timestamp: getTimestamp(),
      id: generateId()
    });

    return this.todoList[0];
  }

  updateTodo(id: string, todo: Todo) {
    const index = this.todoList.findIndex(todo => todo.id === id);
    this.todoList[index] = todo;
    return todo;
  }

  removeTodo(id: string) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
  }

  getMembers() {
    return this.members;
  }
}
