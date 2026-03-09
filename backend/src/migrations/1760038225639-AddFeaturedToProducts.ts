import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFeaturedToProducts1760038225639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE products DROP COLUMN featured`);
    }

}
