import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCreatedAtAndUpdatedAt1593956579145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users',[
            new TableColumn({
                name: 'createdAt',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            }),
            new TableColumn({
                name: 'updatedAt',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            })
        ])
        await queryRunner.addColumns('posts',[
            new TableColumn({
                name: 'createdAt',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            }),
            new TableColumn({
                name: 'updatedAt',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            })
        ])
        await queryRunner.addColumns('comments',[
            new TableColumn({
                name: 'createdAt',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            }),
            new TableColumn({
                name: 'updatedAt',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropColumn('users','created');
            await queryRunner.dropColumn('users','updated');
            await queryRunner.dropColumn('posts','created');
            await queryRunner.dropColumn('posts','updated');
            await queryRunner.dropColumn('comments','created');
            await queryRunner.dropColumn('comments','updated');
        }catch (e) {

        }
    }

}
