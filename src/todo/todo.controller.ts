import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user/user';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(user.id, createTodoDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.todoService.findAllTodos(user.id);
  }

  @Get('/all/statuses')
  getTodoStatuses(@CurrentUser() user: User) {
    return this.todoService.getTodoStatuses(user.id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.todoService.findTodoById(user.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(user.id, id, updateTodoDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.todoService.deleteTodo(user.id, id);
  }
}
