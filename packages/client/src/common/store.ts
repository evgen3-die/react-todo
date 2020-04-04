import { observable, action } from 'mobx';
import { Todo as TodoInterface, Member } from '@todo/shared/interfaces';
import { fetcher } from '.';

class Store {
  @observable members: Member[] = [];
  @observable todoList: TodoInterface[] = [];

  @action async fetchMembers() {
    const response = await fetcher('/members');
    this.members = await response.json();
  }

  @action async fetchTodoList() {
    const response = await fetcher('/');
    this.todoList = await response.json();
  }

  @action init() {
    return Promise.all([
      this.fetchMembers(),
      this.fetchTodoList()
    ]);
  }

  @action async removeTodo(id: string) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    await fetcher(`/${id}`, {
      method: 'delete'
    });
  }
}

export default new Store();
