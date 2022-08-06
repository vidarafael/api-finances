import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1659705894865 implements MigrationInterface {
    name = 'migration1659705894865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."videos_category_enum" AS ENUM('Renda Fixa', 'Ações', 'FIIS', 'Aplicativo', 'Criptomoeda', 'Economia')`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" character varying NOT NULL, "url" character varying NOT NULL, "category" "public"."videos_category_enum" NOT NULL DEFAULT 'Economia', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commentaries" ("id" character varying NOT NULL, "description" character varying NOT NULL, "video_id" character varying NOT NULL, "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ed3fdbbb5350a68bd6d1d2f0061" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "goals" ("id" character varying NOT NULL, "name" character varying NOT NULL, "amount" numeric NOT NULL, "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_26e17b251afab35580dff769223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_videos" ("id" character varying NOT NULL, "video_id" character varying NOT NULL, "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_8c365c38fa39e2a1b4c4c7fa52" UNIQUE ("video_id"), CONSTRAINT "PK_81de4bb177692df6a6de12ea9ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "investments" ("id" character varying NOT NULL, "value" numeric NOT NULL, "dayOfInvestment" TIMESTAMP NOT NULL, "goal_id" character varying NOT NULL, "priority" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_f9b6a9371cd29c494e9ac2dd3a" UNIQUE ("goal_id"), CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "investments_transactions" ("id" character varying NOT NULL, "value" numeric NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "investment_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a55d560f3917e1c5a25bccbb497" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallets" ("id" character varying NOT NULL, "user_id" character varying NOT NULL, "value" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_92558c08091598f7a4439586cd" UNIQUE ("user_id"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallets_transactions" ("id" character varying NOT NULL, "value" numeric NOT NULL, "category" character varying NOT NULL, "description" character varying NOT NULL, "wallet_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e534d0266aa420cde8fb7107803" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "commentaries" ADD CONSTRAINT "FK_e736daa4eac6b43e5b05d9e57c7" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentaries" ADD CONSTRAINT "FK_1515ce585be6361c57ea892014a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goals" ADD CONSTRAINT "FK_88b78010581f2d293699d064441" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_videos" ADD CONSTRAINT "FK_8c365c38fa39e2a1b4c4c7fa529" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_videos" ADD CONSTRAINT "FK_1e0c9710484d4820045194022a3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investments" ADD CONSTRAINT "FK_f9b6a9371cd29c494e9ac2dd3ad" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investments_transactions" ADD CONSTRAINT "FK_34ad16a2bca10c3bd4d43f544a4" FOREIGN KEY ("investment_id") REFERENCES "investments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_92558c08091598f7a4439586cda" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets_transactions" ADD CONSTRAINT "FK_92ed215fc811cb700aac4dd2d17" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets_transactions" DROP CONSTRAINT "FK_92ed215fc811cb700aac4dd2d17"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_92558c08091598f7a4439586cda"`);
        await queryRunner.query(`ALTER TABLE "investments_transactions" DROP CONSTRAINT "FK_34ad16a2bca10c3bd4d43f544a4"`);
        await queryRunner.query(`ALTER TABLE "investments" DROP CONSTRAINT "FK_f9b6a9371cd29c494e9ac2dd3ad"`);
        await queryRunner.query(`ALTER TABLE "favorites_videos" DROP CONSTRAINT "FK_1e0c9710484d4820045194022a3"`);
        await queryRunner.query(`ALTER TABLE "favorites_videos" DROP CONSTRAINT "FK_8c365c38fa39e2a1b4c4c7fa529"`);
        await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_88b78010581f2d293699d064441"`);
        await queryRunner.query(`ALTER TABLE "commentaries" DROP CONSTRAINT "FK_1515ce585be6361c57ea892014a"`);
        await queryRunner.query(`ALTER TABLE "commentaries" DROP CONSTRAINT "FK_e736daa4eac6b43e5b05d9e57c7"`);
        await queryRunner.query(`DROP TABLE "wallets_transactions"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TABLE "investments_transactions"`);
        await queryRunner.query(`DROP TABLE "investments"`);
        await queryRunner.query(`DROP TABLE "favorites_videos"`);
        await queryRunner.query(`DROP TABLE "goals"`);
        await queryRunner.query(`DROP TABLE "commentaries"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TYPE "public"."videos_category_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
