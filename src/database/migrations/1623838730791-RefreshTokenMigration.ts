import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1623835743323 implements MigrationInterface {
  private readonly tableName = 'refresh_tokens';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'value',
            type: 'varchar',
            width: 255,
          },
          {
            name: 'hash',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'expires',
            type: 'datetime',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
