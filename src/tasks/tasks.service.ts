/* Repository
With Repository, we can manage particular entity. Repository has 
some functions to interact with entity. Repository are handled by TypeORM, */

import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from 'src/dto/UpdateTaskDto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // create
  async createTask(task: Task) {
    if (task.title === '') {
      throw new BadRequestException('Title cannot be empty.');
    }
    const newTask = await this.taskRepository.create(task);
    newTask['Result'] = 'Task created successfully.';
    await this.taskRepository.save(newTask);
    return newTask;
  }

  // find all
  getAllTasks() {
    return this.taskRepository.find();
    // return this.taskRepository.createQueryBuilder('task').select(['DISTINCT task.title']).getRawMany();
    // return this.taskRepository.find({take:2});
    // return this.taskRepository.find({skip:2, take:2});
  }

  // find by id
  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (task) {
      return task;
    }
    console.log('fdhuhgfdghdggydfgdyf');
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  // update
  async updateTask(id: number, posttask: UpdateTaskDto) {
    const updatedTask = await this.taskRepository.findOne({ where: { id } });
    updatedTask['Result'] = 'Task updated successfully.';

    if (updatedTask) {
      await this.taskRepository.update(id, posttask);
      return updatedTask;
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteTask(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (task) {
      // await this.taskRepository.remove(task);
      task.is_deleted = true;
      await this.taskRepository.save(task);
      return { status: 'success', message: 'Task deleted successfully.' };
    } else {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }
}
