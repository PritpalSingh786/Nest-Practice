import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { dbdatasource } from '../db/data.source';
import { UpdateSummaryListener } from '../src/tasks/update-summary.listener';
import { SummaryTable } from '../src/tasks/summary-table.entity';
import { Task } from '../src/tasks/tasks.entity';
import { User } from '../src/auth/user.entity';


@Module({
  imports: [

    TypeOrmModule.forRoot(dbdatasource),
    TypeOrmModule.forFeature([User, Task, SummaryTable]),
    

    TasksModule,

    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService, UpdateSummaryListener],
})
export class AppModule {}
