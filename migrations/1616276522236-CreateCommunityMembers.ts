import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommunityMembers1616276522236 implements MigrationInterface {
  name = 'CreateCommunityMembers1616276522236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "community_members" ("users_id" integer NOT NULL, "communities_id" integer NOT NULL, CONSTRAINT "PK_5a5f858f6250c2d74c083b71f16" PRIMARY KEY ("users_id", "communities_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_abfd3c52e9e0703af319955e85" ON "community_members" ("users_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f92ad7d26dadad6ec8a38accc3" ON "community_members" ("communities_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "community_members" ADD CONSTRAINT "FK_abfd3c52e9e0703af319955e859" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "community_members" ADD CONSTRAINT "FK_f92ad7d26dadad6ec8a38accc3d" FOREIGN KEY ("communities_id") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "community_members" DROP CONSTRAINT "FK_f92ad7d26dadad6ec8a38accc3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "community_members" DROP CONSTRAINT "FK_abfd3c52e9e0703af319955e859"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_f92ad7d26dadad6ec8a38accc3"`);
    await queryRunner.query(`DROP INDEX "IDX_abfd3c52e9e0703af319955e85"`);
    await queryRunner.query(`DROP TABLE "community_members"`);
  }
}
