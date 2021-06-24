import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class FollowerMigration1623836342195 implements MigrationInterface {
  private readonly tableName = 'followers';
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
            name: 'status',
            type: 'enum',
            enum: ['Pending', 'Accepted', 'Declined'],
          },
          {
            name: 'followerId',
            type: 'varchar',
            width: 36,
          },
          {
            name: 'targetId',
            type: 'varchar',
            width: 36,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'followerId_fk_1',
            referencedTableName: 'users',
            columnNames: ['followerId'],
            referencedColumnNames: ['id'],
          }),
          new TableForeignKey({
            name: 'targetId_fk_1',
            referencedTableName: 'users',
            columnNames: ['targetId'],
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
