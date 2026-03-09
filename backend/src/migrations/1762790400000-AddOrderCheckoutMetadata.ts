import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderCheckoutMetadata1762790400000 implements MigrationInterface {
    name = 'AddOrderCheckoutMetadata1762790400000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "paymentMethod" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shippingAddress" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shippingAddress"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "paymentMethod"`);
    }
}
