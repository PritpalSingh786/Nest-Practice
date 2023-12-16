import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1702713507359 implements MigrationInterface {
    name = 'NewMigrations1702713507359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "username" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE ("username", "email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "summary_table" ("id" int NOT NULL IDENTITY(1,1), "user_id" int NOT NULL, "username" nvarchar(255) NOT NULL, "task_count" int NOT NULL, CONSTRAINT "PK_91e711f4b81175cc7ffcc299482" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "completed" bit NOT NULL CONSTRAINT "DF_7427173504130527bb6c12a12a4" DEFAULT 0, "imagePath" nvarchar(255), "is_deleted" bit NOT NULL CONSTRAINT "DF_995b64416b50ba57fd7c0436a4f" DEFAULT 0, "userId" int, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "summary_table"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
