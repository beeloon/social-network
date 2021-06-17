import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1623835743323 implements MigrationInterface {
  private readonly tableName = 'users';
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
            name: 'username',
            type: 'varchar',
            width: 255,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
