import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725471085409 implements MigrationInterface {
    name = 'Migration1725471085409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalStake"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalStake" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalOdds"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalOdds" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "potentialWin"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "potentialWin" text`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "grossWinnings"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "grossWinnings" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "grossWinnings"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "grossWinnings" numeric`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "potentialWin"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "potentialWin" numeric`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalOdds"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalOdds" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalStake"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalStake" numeric NOT NULL`);
    }

}
