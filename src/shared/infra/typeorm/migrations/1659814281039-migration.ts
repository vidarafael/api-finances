import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1659814281039 implements MigrationInterface {
    name = 'migration1659814281039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "value" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "value" character varying NOT NULL`);
    }

}
