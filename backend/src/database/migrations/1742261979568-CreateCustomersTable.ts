import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomersTable1742261979568 implements MigrationInterface {
    name = 'CreateCustomersTable1742261979568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "salary" bigint NOT NULL, "company_value" bigint NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
