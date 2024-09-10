import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725411066195 implements MigrationInterface {
    name = 'Migration1725411066195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bets" DROP COLUMN "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bets" ADD "date" text NOT NULL`);
    }

}
