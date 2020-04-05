import { observable, action } from 'mobx';
import { Todo as TodoInterface } from '@todo/shared/interfaces';
import { fetcher } from '.';

const headersForJSON = {
  'Content-Type': 'application/json'
};

class Store {
  @observable members: string[] = [];
  @observable todoList: TodoInterface[] = [];

  @action async fetchMembers() {
    const response = await fetcher('/members');
    this.members = await response.json();
  }

  @action async fetchTodoList() {
    const response = await fetcher('/');
    this.todoList = await response.json();
  }

  @action async removeTodo(id: string) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    await fetcher(`/${id}`, {
      method: 'delete'
    });
  }

  @action async createTodo(todo: TodoInterface) {
    const response = await fetcher('/', {
      method: 'post',
      body: JSON.stringify(todo),
      headers: headersForJSON
    });

    this.todoList.unshift(await response.json());
  }

  @action async updateTodo(todo: TodoInterface) {
    const { id } = todo;
    const response = await fetcher(`/${id}`, {
      method: 'put',
      body: JSON.stringify(todo),
      headers: headersForJSON
    });

    const index = this.todoList.findIndex(todo => todo.id === id);
    this.todoList[index] = await response.json();
  }
}

export default new Store();
