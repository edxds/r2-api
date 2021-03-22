import {MigrationInterface, QueryRunner} from "typeorm";

export class AddParentPostDeleteCascade1616372904360 implements MigrationInterface {
    name = 'AddParentPostDeleteCascade1616372904360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_979fb4c9d38af5cb74829ab9a4f"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_979fb4c9d38af5cb74829ab9a4f" FOREIGN KEY ("parent_post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_979fb4c9d38af5cb74829ab9a4f"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_979fb4c9d38af5cb74829ab9a4f" FOREIGN KEY ("parent_post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
