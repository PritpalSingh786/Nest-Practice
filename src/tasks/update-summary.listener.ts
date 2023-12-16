import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { User } from '../auth/user.entity';
import { SummaryTable } from './summary-table.entity';

@EventSubscriber()
export class UpdateSummaryListener implements EntitySubscriberInterface<Task> {
  constructor(
    @InjectRepository(SummaryTable)
    private readonly summaryRepository: Repository<SummaryTable>,
  ) {}

  listenTo() {
    return Task;
  }

  afterInsert(event: InsertEvent<Task>) {
    this.updateSummary(event.entity.user);
  }

  afterUpdate(event: UpdateEvent<Task>) {
    if (event.updatedColumns.some((column) => column.propertyName === 'user')) {
      this.updateSummary(event.entity.user);
    }
  }

  private async updateSummary(user: User) {
    const summary = await this.summaryRepository.findOne({ where: { user_id: user.id } });
  

    if (summary) {
      summary.task_count += 1; // Increment task_count by 1
      await this.summaryRepository.save(summary);
    } else {
      const newSummary = this.summaryRepository.create({
        user_id: user.id,
        username: user.username,
        task_count: 1, // Assuming a new task is being created
      });
      await this.summaryRepository.save(newSummary);
    }
  }
}
