import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo/todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '../users/entities/user/user';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createTodo(
    userId: string,
    createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    const todo = this.todoRepository.create({
      ...createTodoDto,
      user,
      createdBy: userId,
    });
    return this.todoRepository.save(todo);
  }

  async findAllTodos(userId: string): Promise<Todo[]> {
    return this.todoRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async findTodoById(userId: string, id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return todo;
  }

  async updateTodo(
    userId: string,
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const result = await this.todoRepository.update(
      { id, user: { id: userId } },
      {
        ...updateTodoDto,
        updatedBy: userId,
        updatedAt: new Date(),
      },
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }

    return this.findTodoById(userId, id);
  }

  async deleteTodo(userId: string, id: string): Promise<void> {
    const todo = await this.findTodoById(userId, id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }

    todo.deletedAt = new Date();
    todo.deletedBy = userId;
    await this.todoRepository.save(todo);
  }

  async getTodoStatuses(userId: string): Promise<Record<string, Todo[]>> {
    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId })
      .getMany();

    return todos.reduce(
      (acc, todo) => {
        const status = todo.status || 'UNKNOWN';
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(todo);
        return acc;
      },
      {} as Record<string, Todo[]>,
    );
  }
}
