import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { User } from '../auth/user.entity';
import { SummaryTable } from './summary-table.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Task, SummaryTable])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
