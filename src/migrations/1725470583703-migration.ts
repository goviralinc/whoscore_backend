import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725470583703 implements MigrationInterface {
    name = 'Migration1725470583703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bets" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "bets" DROP COLUMN "bet_status"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "grossWinnings" numeric`);
        await queryRunner.query(`ALTER TABLE "bets" ADD "betType" text`);
        await queryRunner.query(`ALTER TABLE "bets" ADD "betStatus" text`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalStake"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalStake" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalOdds"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalOdds" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "potentialWin"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "potentialWin" numeric`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "oddType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "hometeam" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "awayteam" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "time" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" DROP COLUMN "odds"`);
        await queryRunner.query(`ALTER TABLE "bets" ADD "odds" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bets" DROP COLUMN "odds"`);
        await queryRunner.query(`ALTER TABLE "bets" ADD "odds" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "awayteam" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "hometeam" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" ALTER COLUMN "oddType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "potentialWin"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "potentialWin" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalOdds"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalOdds" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "totalStake"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "totalStake" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bets" DROP COLUMN "betStatus"`);
        await queryRunner.query(`ALTER TABLE "bets" DROP COLUMN "betType"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "grossWinnings"`);
        await queryRunner.query(`ALTER TABLE "bets" ADD "bet_status" text`);
        await queryRunner.query(`ALTER TABLE "bets" ADD "type" text NOT NULL`);
    }

}
