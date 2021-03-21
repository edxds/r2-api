import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostCreatedAt1616344106648 implements MigrationInterface {
  name = 'AddPostCreatedAt1616344106648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
  }
}
