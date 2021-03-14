import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommunitiesTable1615737574376 implements MigrationInterface {
  name = 'CreateCommunitiesTable1615737574376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "communities" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "title" character varying NOT NULL, "desc" text, "avatar" character varying, "is_private" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_CODE" UNIQUE ("code"), CONSTRAINT "PK_fea1fe83c86ccde9d0a089e7ea2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "communities"`);
  }
}
