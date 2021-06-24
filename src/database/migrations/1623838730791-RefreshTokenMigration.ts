import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class RefreshTokenMigration1623838730791 implements MigrationInterface {
  private readonly tableName = 'refresh_tokens';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            width: 36,
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'varchar',
            width: 255,
          },
          {
            name: 'user_id',
            type: 'varchar',
            width: 36,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'users_fk_1',
            referencedTableName: 'users',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
