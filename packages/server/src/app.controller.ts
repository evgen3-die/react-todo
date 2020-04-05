import { Controller, Get, Put, Param, Delete, Post, Body } from '@nestjs/common';
import { Todo } from '@todo/shared/interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTodoList() {
    return this.appService.getTodoList();
  }

  @Post()
  createTodo(@Body() todo: Todo) {
    return this.appService.createTodo(todo);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() todo: Todo) {
    return this.appService.updateTodo(id, todo);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    this.appService.removeTodo(id);
  }

  @Get('members')
  getMembers() {
    return this.appService.getMembers();
  }
}
