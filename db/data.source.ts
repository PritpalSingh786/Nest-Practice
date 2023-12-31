import { DataSource, DataSourceOptions } from 'typeorm';
import { UpdateSummaryListener } from '../src/tasks/update-summary.listener';
export const dbdatasource: DataSourceOptions = {
    type: 'mssql',
    host: 'localhost',
    username: 'pritpalpractice',
    password: 'admin123',
    // Database name
    database: 'pritpalpractice',
    // Synchronize database schema with entities 
    synchronize: true,
    // entities: [__dirname + '/**/*.entity{.ts.js}'],
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    subscribers: [UpdateSummaryListener],
    options: { encrypt: false },
    // migrations: ['dist/tasks/migrations/*.js'],
    // migrationsTableName: "task_migrations",
};

const dataSource = new DataSource(dbdatasource)
export default dataSource