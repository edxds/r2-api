import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTokensTable1614998401305 implements MigrationInterface {
  name = 'CreateTokensTable1614998401305';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "sub" integer NOT NULL, "agent" character varying NOT NULL, "revoked" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
