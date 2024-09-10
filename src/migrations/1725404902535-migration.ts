import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725404902535 implements MigrationInterface {
    name = 'Migration1725404902535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedDate" TIMESTAMP WITH TIME ZONE, "date" text NOT NULL, "oddType" text NOT NULL, "type" text NOT NULL, "time" text NOT NULL, "hometeam" text NOT NULL, "awayteam" text NOT NULL, "odds" double precision NOT NULL, "bet_status" text, "scores" text, "ticketId" uuid, CONSTRAINT "PK_7ca91a6a39623bd5c21722bcedd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedDate" TIMESTAMP WITH TIME ZONE, "ticketId" text NOT NULL, "betPlatform" text NOT NULL, "type" text NOT NULL, "totalStake" double precision NOT NULL, "totalOdds" double precision NOT NULL, "potentialWin" double precision NOT NULL, CONSTRAINT "UQ_821bc8d8a99877453cb727b40ff" UNIQUE ("ticketId", "betPlatform"), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bets" ADD CONSTRAINT "FK_6307fce30155cdae345a46b1377" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bets" DROP CONSTRAINT "FK_6307fce30155cdae345a46b1377"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "bets"`);
    }

}
