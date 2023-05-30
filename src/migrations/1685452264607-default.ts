import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1685452264607 implements MigrationInterface {
    name = 'Default1685452264607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(30) NOT NULL, CONSTRAINT "UQ_cf461f5b40cf1a2b8876011e1e1" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer, CONSTRAINT "fk_id_host" FOREIGN KEY ("idhost") REFERENCES "team" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idvisitor") REFERENCES "team" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_matches"("id", "date", "idhost", "idvisitor") SELECT "id", "date", "idhost", "idvisitor" FROM "matches"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`ALTER TABLE "temporary_matches" RENAME TO "matches"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" RENAME TO "temporary_matches"`);
        await queryRunner.query(`CREATE TABLE "matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idhost" integer, "idvisitor" integer)`);
        await queryRunner.query(`INSERT INTO "matches"("id", "date", "idhost", "idvisitor") SELECT "id", "date", "idhost", "idvisitor" FROM "temporary_matches"`);
        await queryRunner.query(`DROP TABLE "temporary_matches"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
