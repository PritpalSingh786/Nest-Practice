import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from 'src/dto/UpdateTaskDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './tasks.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksservice: TasksService) {}

  // create task with file
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Specify your upload directory
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createTasks(@Request() req, @UploadedFile() image, @Body() task: Task) {
    task.user = req.user.id;
    if (image) {
      task.imagePath = image.path;
    }

    return this.tasksservice.createTask(task);
  }

  // get all tasks
  @Get()
  @UseGuards(JwtAuthGuard)
  getTasks(@Request() req) {
    // console.log(req.user.id)
    return this.tasksservice.getAllTasks();
  }

  // get task by id
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // for posting query parameter
  // getTaskById(@Query('id') id: number) {
  getTaskById(@Param('id') id: number) {
    console.log('dhygsgyggyd');
    return this.tasksservice.getTaskById(id);
  }

  // update todo
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateTask(
    @Param('id') id: string,
    @UploadedFile() image,
    @Body() posttask: UpdateTaskDto,
  ) {
    if (image) {
      posttask.imagePath = image.path;
    }
    return this.tasksservice.updateTask(Number(id), posttask);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string) {
    return this.tasksservice.deleteTask(Number(id));
  }
}
