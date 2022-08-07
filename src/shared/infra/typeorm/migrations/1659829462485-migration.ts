import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1659829462485 implements MigrationInterface {
    name = 'migration1659829462485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."investments_transactions_type_enum" AS ENUM('deposit', 'withdraw')`);
        await queryRunner.query(`ALTER TABLE "investments_transactions" ADD "type" "public"."investments_transactions_type_enum" NOT NULL DEFAULT 'deposit'`);
        await queryRunner.query(`CREATE TYPE "public"."wallets_transactions_type_enum" AS ENUM('deposit', 'withdraw')`);
        await queryRunner.query(`ALTER TABLE "wallets_transactions" ADD "type" "public"."wallets_transactions_type_enum" NOT NULL DEFAULT 'deposit'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets_transactions" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."wallets_transactions_type_enum"`);
        await queryRunner.query(`ALTER TABLE "investments_transactions" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."investments_transactions_type_enum"`);
    }

}
