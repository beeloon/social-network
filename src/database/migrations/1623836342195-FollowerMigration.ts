import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1623835743323 implements MigrationInterface {
  private readonly tableName = 'followers';
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
            name: 'status',
            type: 'enum',
            enum: ['Pending', 'Accepted', 'Declined'],
            width: 255,
            default: 'Pending',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
