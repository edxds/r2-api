import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePosts1616294826866 implements MigrationInterface {
  name = 'CreatePosts1616294826866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "content" text NOT NULL, "author_id" integer NOT NULL, "community_id" integer NOT NULL, "parent_post_id" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_979fb4c9d38af5cb74829ab9a4f" FOREIGN KEY ("parent_post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_979fb4c9d38af5cb74829ab9a4f"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
