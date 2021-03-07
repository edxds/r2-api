import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersConstraints1615075431206 implements MigrationInterface {
  name = 'CreateUsersConstraints1615075431206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_USERNAME" UNIQUE ("username")`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_EMAIL" UNIQUE ("email")`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."needs_setup" IS NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "needs_setup" SET DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "CK_EITHER_SOCIAL_OR_PASSWORD" CHECK ("social_id" is not null or "password" is not null)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CK_EITHER_SOCIAL_OR_PASSWORD"`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "needs_setup" DROP DEFAULT`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."needs_setup" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."password" IS NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_EMAIL"`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_USERNAME"`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
  }
}
